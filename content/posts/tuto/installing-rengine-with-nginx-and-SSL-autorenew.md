---
title: "[EN] - Install Rengine with Nginx and SSL auto renew"
date: 2020-07-25T17:00:00+02:00
draft: false
tags: ["BugBounty", "Tips", "Tuto", Rengine]
---

[EDIT] : This post doesn't work anymore with the latest versions of nuclei, look instead at [My bounty infrastructure with Docker](/posts/2020/08/en-my-bounty-infrastructure-with-docker/)

Recently, I teased on [Twitter](https://twitter.com/J0_mart/status/1272842255057981440) a new version of [AutoRecon](https://github.com/JoshuaMart/AutoRecon) with a web interface :

![AutoRecon panel](/images/2020/tuto/rengine_autorecon_panel.png)

But it was without counting on the incredible work of [Yogeshojha](https://twitter.com/ojhayogesh11) and if you haven't seen it yet, I advise you to go take a look at Rengine which according to the repository is automated reconnaissance framework with a web interface and rather than starting from scratch, it is based on existing tools.

![Rengine panel](/images/2020/tuto/rengine_panel.png)

I propose here to show you quickly how to install it and access it in HTTPS. Since the latest versions of Rengine, it also includes a Nginx container (with certificate generation) unfortunately this did not suit me, so I adapted the configuration to fit my current architecture.

In addition to removing the `docker-compose.setup.yml` file I made changes in the `Makefile` and `docker-compose.yml` file which you can find [here](https://gist.github.com/JoshuaMart/2e6a62c726868513de722f7b3cd1d6d4).

Next, I created a small script that will install the different dependencies (Nginx, Docker, Certbot) and configure Nginx.

Prerequisites are to have a domain pointing to your server. Concerning this one, I recommend you to take a VPS with at least 2Gb of RAM because I had difficulties to install Rengine on a machine with 1Gb especially with the installation of some tools or without going into details, Go consumes too much memory to install them.

The script can be accessed [here](https://gist.github.com/JoshuaMart/bf810bb4bd7c5071eeaa2b1f657f8ed1). The only thing to do is to modify the two variables at the beginning of the script to put your domain name and your email address.

this one can be used for two purposes :
* You install Nginx and Docker (and thus Rengine) on the same machine.
* You install Nginx and Docker (+Rengine) on two different machines.

![Rengine Nginx usecase](/images/2020/tuto/rengine_nginx_schema.png)

But It is not specifically for Rengine and can be used for any other container or application ...
So once you've changed the two variables and run the script
```bash
./Auto_Nginx_Rengine.sh
```
If you are in case number 2, you will have to modify the file `/etc/nginx/sites-available/{your_domain_domain.tld}.conf` and modify the line `proxy_pass` by changing the IP to that of your second server.

All that will be left is to install Rengine :
```bash
git clone https://github.com/yogeshojha/rengine.git
cd rengine
make up
```

Then all you have to do is create an account on the application with the command :
```bash
make username
```

That's it, all you have to do is access your domain.
![Rengine Nginx usecase](/images/2020/tuto/rengine_https.png)

It's possible that you don't have an image / CSS on the login page, but once logged in everything is ok.