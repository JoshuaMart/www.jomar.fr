---
title: "[EN] - My subdomains enumeration process"
date: 2020-03-21T17:00:00+02:00
draft: false
tags: ["BugBounty", "Recon", "Automation", "Monitoring"]
---

Today I would like to make a short post about how I enumerate subdomains when approaching a new target and why I created [AutoRecon](https://github.com/JoshuaMart/AutoRecon/).

![](/images/2020/bounty/Autorecon_Workflow.png)

## Subdomain enumeration, monitoring & automation

Initially when I created [AutoRecon](https://github.com/JoshuaMart/AutoRecon/) I wanted to automate the whole recognition process but I quickly realized that it was very difficult and finally even useless, why?
* Recognition depends on each target
* Running a whole bunch of tools and just being satisfied with the results was missing too much information.

Initially the tool checked CORS, TakeOver, port scan, JS, ... the output was terrible and I spent a considerable amount of time finding interesting information, so I preferred to reduce the tools I was chaining up until now to arrive only to domain enumeration and scan with [Aquatone](https://github.com/michenriksen/aquatone) even if in the next version it is not impossible that I will reintegrate the takeover domain check (as an option) via [Tko-Subs](https://github.com/anshumanbh/tko-subs).

Here are the tools I use today in [AutoRecon](https://github.com/JoshuaMart/AutoRecon/) :
- [Amass](https://github.com/OWASP/Amass/) : According to all my tests it's the best tool for domain enumeration, not the fastest, but the one with the most complete results, especially when used with external (configurable) APIs.
- [DnsGen](https://github.com/ProjectAnte/dnsgen) : Generates permutations on found domains, it's super fast which is pretty cool.
- [ShuffleDNS](https://github.com/projectdiscovery/shuffledns) : Checks the validity of domains and removes wildcards, its latest version makes it rather fast (the project is also based on [MassDNS](https://github.com/blechschmidt/massdns))
- [Aquatone](https://github.com/michenriksen/aquatone) : Even if the project doesn't seem to be maintained anymore, it's a must-have, scan a domain list and create an output HTML file with the screenshots of each site, we have the haders and the tool is able to check if a site is present on a whole bunch of different ports.

In addition to [AutoRecon](https://github.com/JoshuaMart/AutoRecon/), I now use [Monitorizer](https://github.com/BitTheByte/Monitorizer) which allows me to monitor the output of new subdomains, the tool also directly performs a port scan when a new domain is detected and warns you about Slack.

The output produced by [AutoRecon](https://github.com/JoshuaMart/AutoRecon/) can be used with many tools afterwards, for example :
- [Hakrawler](https://github.com/hakluke/hakrawler) et [Kxss](https://github.com/tomnomnom/hacks/tree/master/kxss) to crawl the site and try to find some "easy" XSS
- [Waybackurls](https://github.com/tomnomnom/waybackurls) to try to discover old endpoints
- [LinkFinder](https://github.com/GerbenJavado/LinkFinder) to scan JS files and also find new endpoints
- [Masscan](https://github.com/robertdavidgraham/masscan) to discover open ports
- [Arjun](https://github.com/s0md3v/Arjun) to discover hidden parameters
- [Corsy](https://github.com/s0md3v/Corsy) to analyze the CORS

## Conclusion

In short ... a lot of tools can be used but in my opinion they should correspond to what you want to look for and not be launched hoping for a miracle result. For example if you want to find a CORS and there are 500 domains to check, actually running [Corsy](https://github.com/s0md3v/Corsy) seems to be a good start before a second manual analysis of the results that you think is relevant and it is exactly for this reason that today I only prefer to automate my sub-domain search than my entire recon process.

I'm not an experienced hunter but recognition is an important element and especially, I think, the enumeration of sub-domains, because discovering a domain first or even no hunter is perhaps a real gold mine!