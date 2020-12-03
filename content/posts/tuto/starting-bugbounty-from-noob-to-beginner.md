---
title: "[EN] - Starting BugBounty : From noob to beginner "
date: 2019-12-31T17:00:00+02:00
draft: false
tags: ["BugBounty", "Tips", "Tuto"]
---

Through this article I would like to explain how I was able to start bugbounty this year with the hope that it will help some people.

## My background

First of all, I'm currently doing a master's degree in information systems security but I've been interested in computer security for several years already and even if the name of my diploma could indicate that we do security, apart from a few hours of classes, my studies won't have helped me at all for bugbounty.

On the other hand, today I have the chance to work as a security consultant (mainly web and internal pentest missions) with very competent colleagues who do BugBounty themselves. So I have direct access to people who can guide me, answer my questions or help me solve problems, which makes a lot of things easier, it's true.

I started computer science at the age of 10/11 years old with WEB programming in PHP where I made horrible sites (I hate frontend) to quickly turn to system administration (and setting up game servers) so naturally I undertook a higher education in system and network administration.

From my first year of higher education I became more seriously interested in security, so I started CTF and other challenges on platforms such as Root-Me or Hackthebox.

From article to article and blog to blog I naturally quickly came across the BugBounty, having discovered this principle I was directly interested in.

## My first report
My first report dates back to June 2018 and it was not glorious, I had found a vulnerability on the site of a large French web host that allowed me to access all customer information (name, first name, email, address, phone number, ...) unfortunately it was out of scope.

I still took the risk to create my first report, this one is horrible, it is not even ten lines long. The concerned company has therefore chosen to place my report in informative and rewarded me with a gift card valid on their products.

## Getting started: a lot of frustration

The beginning was difficult for several reasons :
 - I wanted to hunt down a program I liked.
- Public programs discouraged me because I thought there was nothing left...
- I didn't know where to start looking

Then I found a program that I liked (public) on another platform, so I signed up and started looking for my first real vulnerability.

Luckily, one of my colleagues helped me one night and we quickly found a vulnerability (low) and then I found another one (medium) a few moments later on the same endpoints.

Happy, I quickly wrote the reports (of better quality than my very first property) and ... big frustration ...

Since the program didn't pay the lows, they accepted the low and put the medium in duplicate of the low (although it was the same endpoints, it wasn't the same vulnerability and didn't affect the same things).

Despite a long message from me they never replied and simply closed the report.
So I put the bugbounty aside for a while to concentrate on the practice.

## Read, Watch and practice
For my part, I find that reading and practicing is a very good way for improvement, I read a lot of books but 90% of them are related to computer security, I won't make a list of all my readings but I can at least recommend "[Real-World Bug Hunting: A Field Guide to Web Hacking](https://www.amazon.fr/Real-World-Bug-Hunting-Field-Hacking/dp/1593278616)" by Peter Yaworski. (From memory, you will get a free digital copy of it if you register on HackerOne).

On Youtube you will also find excellent videos such as "[bug bounty hunting methodology](https://www.youtube.com/watch?v=Qw1nNPiH_Go)" by Jason Haddix, or the different videos from [Stök](https://www.youtube.com/channel/UCQN2DsjnYH60SFBIA6IkNwg) or [Nahamsec](https://www.youtube.com/channel/UCCZDt7MuC3Hzs6IH4xODLBw).

The latter focuses mainly on the recognition of a target which is very important especially when the scope is important.

Concerning the practice, there are more and more platforms that exist, here are some of them:
- [Pentesterlab](https://pentesterlab.com/) : Very good platform to follow your first courses in computer security on various categories ranging from simple to very difficult challenges, many of them are guided which allows you to progress at your own pace.
- [Root-me](https://www.root-me.org/) : Once you have gained enough knowledge, practice without help on platforms such as Root-me. Although being good at CTF won't make you a good hunter, many challenges require a good understanding of the vulnerability to exploit what is really good.
- [Hackthebox](https://www.hackthebox.eu/) : Even if most of the challenges are oriented towards system exploitation it is still interesting to understand how they work, many of them exploit a web vulnerability first to get a shell on the system before performing a privilege escalation. In the case of a BugBounty it is for example more interesting to make a report explaining that you have obtained a root shell on the machine rather than just explaining that you have found default credentials on a Tomcat.
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) : Certainly one of the best site that exists, you will find a lot of challenge in several categories with great explanations for each of them, the site is in constant evolution and content is often added.
- [Hacker101](https://www.hacker101.com/) : Released quite recently, this project allows you to realize challenges that I find are for the most part quite realistic and therefore allows you to have a good approach to BugBounty, the big plus of this platform is that you can get your first invitations thanks to the resolution of challenges. A Discord is also available with a lot of nice people who will be happy to help you if needed.

There are a lot of other ways to practice ([bwapp](http://www.itsecgames.com/), [JuiceShop](https://github.com/OWASP/www-project-juice-shop), ...) and even if some will disagree with me for example on the usefulness of Hackthebox, I think that the more knowledge and understanding you have about the target (so on its site but also its infrastructure) the more chances you will have to find a bug.

## Programming
I've already seen several very good hunters say that he doesn't know any language or that they are not able to write a single line of code. Which is certainly true, but I don't think it helps them.

About 2 years ago I decided to take up Go, at the beginning it was a simple choice because it was a fast and easy language to learn. But today many of the tools I use are written in Go and even if I'm not an expert in the language, I can understand how these tools work and possibly modify them as needed, among the tools I use in daily life there are for example [Ffuf](https://github.com/ffuf/ffuf) & [Aquatone](https://github.com/michenriksen/aquatone).

I've also already met bugbounty services written in Go and thanks to what I know about the language I've been able to access pages allowing me to get information leaks.

I've also recently switched to PHP for the simple reason that a large part of websites are written in this language, even if a lot of people hate it, I find that it has evolved a lot, easy to learn, it allows to quickly implement a website with frameworks such as Symfony or Laravel.

In a few evenings, I was able to entirely create my first website, as basic as it is, allowing me to better manage the hundreds of articles and links I have in my favorites.

![SecurityTips](/images/2019/tuto/SecurityTips.png)
And even though I am the only one using my service, I pushed things a bit further by implementing a login/logout/register system quite complete (validation by mail, password reset with expiring link, validation token, ...).), a rank system (user, editor, admin), search system etc... the implementation of these various features have allowed me to better understand the management of sessions and pages accessible by user rank but also the filtering of incoming data (XSS, SQLi, ...).

Bash is also a useful language, it allows to easily automate actions, but we will talk about it in the next chapter.

I'm not talking about all languages, but Python is also a very good and widespread choice, especially in offensive tools. The choice of a language remains difficult I find even if about 80% of websites are written in PHP the fashion today is more to use Angular, React, ... + a third party backend (Go, PHP, Python, Ruby, ...)

## Automation & Tools
Automation is an important thing I find in BugBounty but the trick is to do it intelligently ...

At the very beginning I created a small tool in bash that regroups more than 10 tools, after some time I found that it was completely useless to have a tool that does a lot of scans. Indeed, I had two problems with this approach:

 - Results that I still had to check manually and it was taking me a long time
 - I don't necessarily master the tools that I use.

I finally rewrote my tools to integrate only 4 tools, Amass (subdomain enumeration), DNSGen (subdomain permutations), MassDNS (subdomain checking), Aquatone (subdomain screenshots, header etc...).

![AutoRecon](/images/2019/tuto/AutoRecon.png)
Currently found on my [Github](https://github.com/JoshuaMart/AutoRecon), I'm trying to improve it constantly, the monitoring part still has some flaws that I need to fix.

I still have ideas for improvements but I only want to use tools that I master or write my own tools (long term goal).

So automation or using tools is a good thing but try to understand what you are doing and it's almost required when you have important scopes to observe the news/changes.

## Hard work paid but don't burn out
If you want to succeed, in bugbounty or any other subject there's only one thing to remember : **TryHarder**.

But it's not uncommon to see people who end up burnt out or completely unmotivated it's clear that you won't learn anything by staying in front of Netflix all day, but it's important to know how to stop and take some time for yourself.

Do what you want, forcing yourself is not the best way to learn, and to talk about it I redirect you to this great article : [The Motivation Secret: How to Maintain Intense Motivation as a Hacker (or Anything)](https://medium.com/@hakluke/the-motivation-secret-how-to-maintain-intense-motivation-as-a-hacker-43d8876cc86c)

## Hunt on what you like
There are a lot of programs on the different platforms, for my part I try to hunter on the programs that I like and even if it is not always the case, there are programs that I chose to exclude :

 - Businesses that make millions/billions but don't pay.
 - Programs that take too long to respond and fix vulnerabilities (as this multiplies the chances of having a duplicate).
 - Programs that try to shift the vulnerability to the fact that it is a pre-production environment.

## 2018 goals and 2019 achievement
As far as I'm concerned, at the end of 2018 my goal was simple, to have my first bounty and to learn a lot of new things and that I can say that it is largely achieved with about 30 validated bugs, I learned much more than I expected !

Although I don't have any particular expectation for 2019 regarding the bugbounty I have noted some other related points :
- Finish portswigger Web Security Academy
- Make the many new releases on pentesterlab
- Continued my learning of PHP & Golang
	- Improve my monitoring tool
	- Improve my small site in PHP
- Continued my current progress on BugBounty

2020 is a pivotal year with the end of my studies in September, so I take advantage of this year to learn as much as I can and maybe focus a bit more on bugbounty from 2021.

I can't currently share any of my discoveries but most of the bugs I've found are IDORs and Improper Access Control. I will make new articles in the future to share what I found and how I found it.

## Summary and conclusion
BugBounty is not something that will allow you to earn money easily if you're a beginner, but for me it's something that I've learned a lot this year!

This article is not about money or "how" but rather about my vision of things, I don't think it's a good way to show "How I do it for ..." it's better to understand "Why did I do this for this or that".

Search, read, practice, try, repeat, no one has any secrets, build your own path.
There are no magic tools, test them, understand them and take the ones that fit you the best.

Globalities fit all targets but it's the little things that will make a big difference, choose a target and understand it, the more you understand how it works and the various mechanisms that make it up the more chance you'll have to find bugs that others won't find.

If you're starting from 0 and you want to do bugbounty I highly recommend you the [PortSwigger Web Security Academy](https://portswigger.net/web-security) which in addition to having high quality courses/tutorials will show you how to find bugs in several categories using BurpSuite

You can easily get your first private invitation on [Hacker101](https://www.hacker101.com/) otherwise, on HackerOne, many recommend the Yahoo program as a beginner's program.

If you feel lost that you don't know how to search, start with small scopes and not **.domain.tld*

## Resources & link

- [Subdomain Enumeration: 2019 Workflow](https://0xpatrik.com/subdomain-enumeration-2019/)
- [Subdomain Enumeration: Doing it a Bit Smarter](https://0xpatrik.com/subdomain-enumeration-smarter/)
- [How To Do Your Reconnaissance Properly Before Chasing A Bug Bounty](https://medium.com/bugbountywriteup/guide-to-basic-recon-bug-bounties-recon-728c5242a115)
- [What tools I use for my recon during BugBounty](https://medium.com/bugbountywriteup/whats-tools-i-use-for-my-recon-during-bugbounty-ec25f7f12e6d)
- [Can I Take Over XYZ](https://github.com/EdOverflow/can-i-take-over-xyz) : To find out if a takeover is possible
- [Seclists](https://github.com/danielmiessler/SecLists) : A repository with great wordlists
- [SwiftnessX](https://github.com/ehrishirajsharma/SwiftnessX) : A cross-platform note-taking & target-tracking app for penetration testers.
- [BugBounty Hunting Essentials](https://www.amazon.fr/Bug-Bounty-Hunting-Essentials-Quick-paced/dp/1788626893) : Quick-paced guide to help white-hat hackers get through bug bounty programs
- [Real‑World Bug Hunting](https://www.amazon.fr/Real-World-Bug-Hunting-Field-Hacking/dp/1593278616) : A Field Guide to Web Hacking
- [Nahamsec](https://www.youtube.com/channel/UCCZDt7MuC3Hzs6IH4xODLBw) Youtube Channel
- [Stök](https://www.youtube.com/channel/UCQN2DsjnYH60SFBIA6IkNwg) Youtube Channel
- There are many twitter accounts sharing information about bugbounty or do a search with the hashtag #BountyTips / #BugBountyTips
- You can ask to join Discord Hacker101 which is an excellent community.
---
The tools I almost always use :
- [Aquatone](https://github.com/michenriksen/aquatone) : I always use it when I have multiple targets.
- [DirSearch](https://github.com/maurosoria/dirsearch) : Simple command line tool designed to brute force directories and files in websites.
- [Ffuf](https://github.com/ffuf/ffuf) : Fast web fuzzer written in Go, Good alternative to DirSearch, quite effective on programs like Yahoo (Because it is possible to test several parameters at the same time)
- [LinkFinder](https://github.com/GerbenJavado/LinkFinder) : A python script that finds endpoints in JavaScript files
- [Amass](https://github.com/OWASP/Amass) : For the discovery of sub-domains, don't forget to use the different APIs
- [BurpSuite](https://portswigger.net/burp) : Proxy
- [Wappalyzer](https://www.wappalyzer.com/) : Identify technology on websites
- [Nmap](https://nmap.org/) and/or [masscan](https://github.com/robertdavidgraham/masscan) : Port scanning
---
Other great tools :
- [GitGraber](https://github.com/hisxo/gitGraber) : monitor GitHub to search and find sensitive data in real time for different online services such as: Google, Amazon, Paypal, Github, Mailgun, Facebook, Twitter, Heroku, Stripe...
- [Arjun](https://github.com/s0md3v/Arjun) : HTTP parameter discovery suite.
- [Corsy](https://github.com/s0md3v/Corsy) : CORS Misconfiguration Scanner
- [S3Scanner](https://github.com/sa7mon/S3Scanner) : Scan for open AWS S3 buckets and dump the contents
- [GoWitness](https://github.com/sensepost/gowitness) : A golang, web screenshot utility using Chrome Headless
- [Subzy](https://github.com/LukaSikic/subzy) : Subdomain takeover vulnerability checker
- [Credcheck](https://github.com/secxena/credcheck) : Credentials Checking Framework
- [Wayback](https://github.com/tomnomnom/waybackurls) : Fetch all the URLs that the Wayback Machine knows about for a domain
- [TruffleHog](https://github.com/dxa4481/truffleHog) : Searches through git repositories for high entropy strings and secrets, digging deep into commit history
---
Tools I haven't taken the time to test yet :
- [Silver](https://github.com/s0md3v/Silver) : Mass scan IPs for vulnerable services
- [Monitorizer](https://github.com/BitTheByte/Monitorizer) : The ultimate subdomain monitorization framework