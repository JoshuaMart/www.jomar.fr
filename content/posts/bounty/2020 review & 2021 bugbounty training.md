---
title: "[EN] - 2020 review & 2021 bugbounty training "
date: 2021-01-04T18:00:00+02:00
draft: false
tags: ["BugBounty", "Tips", "Tuto", "Training"]
---

For the first post of 2021 I will first make my own restrospective before starting with my 2021 objectives and for the most important part of this first post, we will talk about the question that I have been asked the most: "where to start ? / How to progress".

## 2020 Review

I wanted to publish this article at the end of the year but for several reasons I've been a bit slow, especially because I took the time to take a step back on this year, a year completely crazy from many points of view (bugbounty or not). I've been relatively active in bugbounty for a little more than a year now and having looked at my old reports chronologically, I'm very proud of where I am today.

Not so long ago I was just doing some challenges here and there during classes with friends, I knew what an XSS was but I was not aware of the possibilities of this vulnerability and other vulnerabilities were completely unknown to me.

In two years I have learned a lot and many people have helped, motivated and supported me. To come back to 2020 if there is one thing I worked on it is my reports, looking at my very first report I was a bit ashamed but well, we all went through it but working on my reports really helped me, apart from writing something understandable (for me as well as for the program) it often led me to do additional research that could only help me in understanding the bug, its impact, the possibilities etc...      
As a contribution to that, I advise you the blog post of [rez0_](https://twitter.com/rez0__) [non-technical bugbounty tips](http://rez0.blog/hacking/2020/12/26/non-technical-bug-bounty-tips.html)

Otherwise bugbounty side, quite proud of some of my findings but also a lot of frustration with some programs and unfortunately have retained more easily the bad points than the best :
- Programs that take 9 months to tell you that your P1 is duplicate (not corrected)
- The many duplicates because the program does not correct
- Bugs closed in informative / won't fix but if you look 2 days later it's fixed
- Bugs closed without any explanation

But besides that some programs are really nice (both humanly and technically) which makes me always want to do bugbounty but maybe differently ... In 2020 I did a lot of collaboration with a friend and for the moment it's the bugbounty sessions that I enjoyed the most. In addition to good moments of exchange and fun we found a lot of interesting bugs that we could not necessarily have found individually and I am convinced that this method of collaboration has really played a role but currently still few programs accept this (outside of the public).

I've been looking at automating some things, that's cool but it's not necessarily what I want to strive for, because even if it allowed me to find bugs, I don't feel as much satisfaction and I've been able to talk about it with some people but personally I find that in some ways it leads to problems.  
I think for me that the most likely example is during a scope update or the opening of a new program, if there are one or more domains with * scope, you are been much more tempted to automate a lot of things to find a maximum of bugs "easy" (easy != low) many programs do not accept automation and in some cases I've even seen sites fall after a scope update.

But to a certain extent it was necessary, because I learned a lot of things. 

![](/images/2021/bounty/AutoRecon.png)

At the end of 2019 I explained for example that I created a recon tool, a tool that I don't use anymore and that I totally gave up today, not that it wasn't useful to me, it taught me a lot of things and I advise everyone to make their own tool, not to automate and make requests in all directions hoping to find a bug, but in order to work on your recon and understand what you are doing, it allowed me to better understand when I can automate things, when I can't do it but mostly why I can or can't do it.

There are always things that I will automate, often redundant tasks or I'm too lazy to do it every time or CVE check especially through [Nuclei](https://github.com/projectdiscovery/nuclei) but for example finding potential parameters via various techniques and fuzzing, all automatically to find bugs, I don't have a lot of fun in it for my part and it's one of my lessons of 2020, continue to do bugbounty but as far as it gives me fun so to know:
- More collaboration
- I don't want to scatter myself on a lot of programs anymore but stay on programs that I like, even if it means finding less bugs but with the objective to find more interesting bugs on the other hand!

I also had the chance to participate to my first Live Hacking Event thanks to Intigriti and it's really a platform that I appreciate and on which I plan to spend more time in 2021! 

There are also nice and accessible people (even if sometimes programs in a language other than English is a bit complicated ^^). During the event unfortunately on my side nothing interesting while others have completely turned the target. I've been able to see really competent people where thanks to them I know tahat I still have a lot of room for improvement before I reach their level (the list would be too long to name them all but especially [MattiBijnens](https://twitter.com/MattiBijnens) who won the event) and even if I didn't perform, once again, I learned a lot and met really nice people like [Pomme](https://twitter.com/pxmme1337) & [Holme](https://twitter.com/holme_sec) for example !

## 2021 Objectif

On the bugbounty side I don't have a specific goal, _I'll wait and see_ but as I was saying, for this year I think I'll focus more on some programs I like, and even if I'll find less bugs, I'll find bugs on programs I like and potentially more interesting.

Otherwise, at the end of this year I spent a lot of time on [www.bugbountytraining.com](www.bugbountytraining.com) which we'll talk about right after but I really appreciate helping people from the platform who come to ask me for help, so well sometimes some people are not nice / rude or just want the solutions while others adopt a better approach, have really complete exchanges it's also a way to learn for them as well as for me in the end.

This platform is quite funny in the sense that I had already planned something similar (much less complete though and of course I couldn't have the same impact with my few followers ^^) with a first beta version developed with my brother which can be found [here](https://github.com/lucasmartinelle/AnotherVulnerableWebApp). The basic idea remains the same, a platform with real bugs, [Zseano](https://twitter.com/zseano) was faster than me and then anyway he realized something I wouldn't have been able to do as complete :D

So on the objective side I'd like to participate a little more to help people, I don't know how yet, I'll think about it, it will go through the blog with some articles (including one that should arrive soon, I just got the authorization from the program to write an article :D, an Intigriti program, I told you it was a great platform ? :P) and otherwise I don't know yet.  

When I really started to train, I created my own wiki that I enriched over the months with tips on vulnerabilities, workflow, technologies etc... I had thought of making it public so I worked a lot on it to refactor everything, create diagrams, add more explanations etc... I'm still working on it. ... but in the end I think it won't be released publicly because most of the tips are not from me, it's just stuff that I've seen left and right and added and I didn't note the source or the original person and I don't want to appropriate their work.

![](/images/2021/bounty/XXE_Explaination.png)

Since I have my DMs open, even if most of the conversations are just people (often not nice) asking me to help exploit a bug or hack a Facebook account (please, stop ...), I've also been able to have good conversations with some people and it's also something I appreciate and would like to develop :)

So, for the moment, not too many objectives, I already have a full month of January (and so much the better) and then I'll see and advise. If I can have the same year in terms of bugbounty it would be great but if not it's ok. Also more digging into some vulnerabilities, the most concrete example I have is that lately I've spent a lot of time on deserialization (Java & .NET mainly) a very interesting subject where I still have a lot to learn but I think I'll soon have more time to work on this kind of subject.

## 2021 BugBounty Training

At the end of 2019 I have already written a first article on this subject [Starting BugBounty from noob to beginner](https://www.jomar.fr/posts/2019/12/en-starting-bugbounty-from-noob-to-beginner/), which I will therefore update a little today and more particularly tell you about [https://www.bugbountytraining.com/](https://www.bugbountytraining.com/).

When I saw the announcement of the platform at the end of 2020 I was a bit skeptical I admit, I knew [Zseano](https://twitter.com/zseano) of course (not personally) but through his tweets and articles and his old platform where I had also submitted some reports.

First of all, do I recommend the platform to someone who has just started? Yes and no
I advise you first to start on [PortSwigger WebSecurity Academy](https://portswigger.net/web-security) / [Pentesterlab](https://pentesterlab.com/) & [TryHackMe](https://tryhackme.com/) and in parallel watch videos ([InsiderPHD](https://www.youtube.com/user/RapidBug) / [Farah Hawa](https://www.youtube.com/channel/UCq9IyPMXiwD8yBFHkxmN8zg)), read articles etc... but don't forget to come and test your skills on Barker once you have the basics, that's when the platform will certainly be the best to quickly teach you a lot of things for a real environment (and that's what makes all the difference and the strength of Barker).

So I don't necessarily advise the platform to beginners (without basic knowledge) because you might feel frustrated if you don't find anything, but if you learn that through practice then yes, but you might often get stuck, fortunately for that you will be able to rely on the many external resources and also ask the community for help.

At first, I didn't necessarily want to pay because I didn't know what to expect, luckily I was able to get free access by finding a bug on [FastFoodHacking](https://www.bugbountyhunter.com/playground) which, as its description indicates, is a barker "preview", it allows you to see a little bit the kind of platform you will have access to if you take a paid subscription.

And wow, what a slap in the face, to tell you about [https://www.bugbountytraining.com/](https://www.bugbountytraining.com/) we're going to cut this into 4 subparts.

#### BugBountyTraining - Barker

Barker is the name of the training platform, there is a site with multiple features, at the time I write these lines there are 67 unique bugs to find and for my part I found 63 unique currently for a total time of 29H (hacking time).

![](/images/2021/bounty/Barker_Stats.png)

I think you could almost say that I've become addicted to the platform, I'm really not a fan of CTF for example so even if I find sites like [root-me](root-me.org/) very interesting, I don't appreciate them as much as Barker.

In addition to being very realistic, you can take the time to think and do your tests without pressure, dig for vulnerabilities, adapt your discovery techniques and approach a target.

Technically I learned a lot if you take for example XSS, the most represented bug on the platform, it's one of the vulnerabilities I like the least, simply because I'm not a fan of front-end technologies and therefore JS is part of it. However, the diversity of XSS makes that I've really been able to progress on this subject, from the most basic to the more complex and exotic, there's a lot to arouse your curiosity and if you take the time to analyze the vulnerabilities, you'll learn a lot.

It also allows you to work on vulnerabilities you've never encountered before, the latest update includes a XXE, honestly not so easy to find and then you have the choice to exploit it in different ways to achieve the same or different ends (more or less critical) and that's what's really great, because even if at some point you detect an XSS for example and just get a box alert you can always come back later and try a cookie theft and try a more complex scenario such as an CSRF token extraction and then another action behind it.

You also have the right not to know and not to put pressure on yourself, to work on the subject, read resources and come back later to try to exploit or try different things.

For example, there's an SSRF to be found, the first time I limited myself to a port scan because I couldn't read a file internally, I was a bit disappointed when I saw the comment on my report telling me that it's valid but that I hadn't dig deep enough. Hum ok ... after having read new resources, done some new tests I could (unexpectedly) go read files (which I shouldn't have ^^) but overall I had found how to exploit "correctly" this SSRF and while still working on it I realized that I could potentially have gotten a RCE thanks to the information I got (but it was too late and not in the basic goal).

And that's what's great, you can start as a complete beginner, exploit a vulnerability quite simply and come back later and say "Hey, it's still the same bug but this time I'm going further or I'm going to exploit it in another way or I'm going to create a scenario with this and that".

Sometimes I find a resource online and say, "Oh, I've got to test this on Barker to see what it looks like," I think if you take the right approach, which is to search manually, understand why it works or why it doesn't work, that's the platform that will allow you to learn the fastest.

Finishing 1st doesn't matter, the important thing is what you will have learned, taking each parameter, fuzz with random XSS / SQLi payloads won't bring you anything (and won't allow you to find most of the bugs anyway) whereas if for example, in the case of a SQLi you understand how it works, why such and such characters, what techniques or why such and such options on SQLmap it shows that you have understood the vulnerability.  
From head there are at least 2 XSS that will tear your hair out if you don't appreciate this vulnerability like I do, it will really require that you understand what you can or cannot do, in a specific context and that you try to inject the desired payload.

Following the evolution of Barker is also an important thing and shows that a site is alive, it evolves, features are added/modified/deleted. It's a feature that should happen I hope and when it will be possible I advise you to first start with version 1.0 then 1.1 then 1.2 etc... to follow the evolution and not directly have all the bugs.  
This allows to have a realistic approach and can sometimes lead to blockages, for example a bug was not present in a feature that I tested many times in Barker 1.0 and 1.1 then a new bug (which is not useful in the logic of the application) appeared with the 1.2, one day Zseano gave a clue on the Discord about this bug, I knew immediately where to look but honestly I would never have done the test without it. Which shows that there are always bugs, always things to do and see.

More than one bug will show you the importance of understanding the application and that it's necessary to test EVERYTHING, it's not because a GET or a SELECT is not vulnerable that a POST or an INSERT won't be ;)

#### BugBountyTraining - Reports

The reports, I talked about it at the beginning and it became something very important for me, maybe one day I will do a dedicated article on how I write my reports but globally I use the following structure (which is the one proposed by the platforms in fact) :

```
* Description : Description of the vulnerability, how I discovered it, why it is possible. I adapt this part according to the interlocutor that I have in front of me, if it is a triager of the platform he does not know the site, if it is another person maybe he does not know the bug or its impact so take the time to explain
* Exploitation / PoC : The different steps to reproduce the bug 
* Impact : The impact it can have, if you have no idea yourself, do you really think it has an impact?
* Remediation : I don't always do it, it depends on the program and the bug, but often while looking for remediations I came across particular cases of exploitation (interesting for me too therefore)
```

There are currently 581 reports disclosed for Barker

![](/images/2021/bounty/Barker_BugFeed.png)

Overall, except for my last reports (because I realized that some of them just copy/paste my reports without changing anything) I disclose everything and it's really interesting to go read other people's reports to see their approach or how they exploited the vulnerability.

The platform is quite flexible on report writing, you can write in your native language (so other than English in particular), write reports more or less complete, as long as it is valid and that's good because it allows you not to be discouraged!

My personal advice on this part is that you should take the time to make complete reports (well sometimes I'm also a bit lazy so some are more complete than others) because writing reports is an integral part of the BugBounty and as said before, it will also help you to better understand some vulnerabilities, possibilities, impacts that it can have etc.... So if you don't feel it at first, feel free to make your report, then dig into the vulnerability and come back to make a more complete report.

The most convincing example at the moment is the presence of a file that (in my opinion) currently has no impact and would therefore be classified N/A on most of the programs, it does not mean that this file is not interesting, just that in this case it is not interesting while in many other cases (bug chain in particular) it would be and unfortunately I have not yet seen a report explaining the impact that this file could have (we discussed the Discord afterwards).

So here it is, once again, no need to make 3km long reports, but if you take the time to make clear and understandable reports (which can therefore be concise) will only benefit you I think when you make reports on a real platform.

On Barker I don't always write like I will write a BB report, it depends on my desire and my motivation, for some bugs I really took the time (SSRF, SQLi & XXE) to explain them, the possibilities etc... hoping to give leads, tips and advices to those who will read it.

#### BugBountyTraining - Community

The point that surprised me the most, the community is something very important I find, in my case, my colleagues have taught me a lot over the last two years and I thank them for that but not all of us are so lucky. This Discord is however an alternative, I have been in some discord / slack etc... but I am never active because the conversations and questions are always the same, so it gets tiring quickly and often people come and ask for their stuff and never participate.

So [Zseano](https://twitter.com/zseano) is super affordable, it's weird to say that but often you're not going to approach a person with more than 30 000 followers because often the person is not going to answer and yet I also learned through my exchanges this year that it's not something that is present in the InfoSec community (I was able to have some conversations with people with a lot of followers who hadn't taken the big head and it's really cool).

Maybe he doesn't realize it but through the Discord he has become the mentor of many people and it offered the possibility to many people to come and train for free, either through the challenges or through the many access keys that he distributed. I thank him for that and I hope that each one of his people will have seized this opportunity.

The community seems to be really placed at the heart of the project and it's great, there are a lot of interesting exchanges on the discord, technical exchanges on vulnerabilities and non-technical exchanges (the impact of vulnerabilities, report writing, note taking, ...) we discuss, exchange and those always in respect.

A lot of people come to talk to me, I get a lot of positive feedback and it's really nice, apart from a few people who try to abuse and get solutions or just that I exploit their bugs I really enjoy answering questions and helping out as much as I can.

#### BugBountyTraining - Hacking Fridays

Well I'm not going to well too much on this part because unfortunately I couldn't take part yet because of lack of time or schedules or I couldn't be present but from a certain number of bugs you can integrate the group "Hacking Friday" which allows you to do collaborative hacking.

As said, I didn't participate yet but I still see a lot of really interesting exchanges and this is exactly what I would like to go for 2021.

----

So yes, Barker has a price and I understand that, but it's really little compared to what you can get. So go ahead and come and take a ride on the Discord :)

If you have the opportunity, I also advise you to participate in the challenges [PortSwigger - WebSecurity Academy](https://portswigger.net/web-security/dashboard). Basically when a new spell category, the top 10 get a gift, it's really nice and intense to try to finish in the top 10 but it really allows you to focus on a bug category and you'll see that you'll learn a lot in a short time with this kind of challenge.

To summarize, if you already have the basics :
- Go to Barker to test your knowledge and deepen it.

Are you starting?
- Either get started on Barker but accept the possibility of being frustrated knowing that there is a ton of resources available online and a community ready to help you.
- Either you start with other sites to acquire the basics (but in a framework less close to reality) and you come back to Barker

Knowing that [bugbountytraining](https://www.bugbountytraining.com/) also offers many resources & challenges, the platform alone should soon become self-sufficient.

## Training ressources
- [BugBounty Essentials](https://www.amazon.fr/Bug-Bounty-Hunting-Essentials-Quick-paced/dp/1788626893): Quick-paced guide to help white-hat hackers get through bug bounty programs
- [Real-World Bug Hunting](https://www.amazon.fr/Real-World-Bug-Hunting-Field-Hacking/dp/1593278616) : A Field Guide to Web Hacking
- [Nahamsec](https://www.youtube.com/channel/UCCZDt7MuC3Hzs6IH4xODLBw) / [Stök](https://www.youtube.com/channel/UCQN2DsjnYH60SFBIA6IkNwg) / [InsiderPHD](https://www.youtube.com/user/RapidBug) / [Farah Hawa](https://www.youtube.com/channel/UCq9IyPMXiwD8yBFHkxmN8zg) / [The XSS rat](https://www.youtube.com/channel/UCjBhClJ59W4hfUly51i11hg) (I really like theses video)
- [Zseano methodology](https://www.bugbountyhunter.com/membership/)
- [Breaking into Information Security: Learning the Ropes 101](https://leanpub.com/ltr101-breaking-into-infosec)
- [PortSwigger WebSecurity Academy](https://portswigger.net/web-security)
- [Owasp CheatSheet](https://cheatsheetseries.owasp.org/)
- [Pentesterlab](https://pentesterlab.com/)
- [TryHackMe](https://tryhackme.com/)
- [Intigriti Blog](https://blog.intigriti.com/)
- [BugBountyHunter - Disclosed](https://www.bugbountyhunter.com/disclosed/)
- [Pentesterland - List of bug bounty writeups](https://pentester.land/list-of-bug-bounty-writeups.html)

I certainly forgot a lot of things, there is a lot of content and more and more, whether it's youtube channels, blogs, books, challenges, whether it's free or paid or there's something for everyone.
It will sometimes be necessary for you to search if you want something specific, some people have less visibility but have really great articles, the one that immediately comes to my mind for example is [this article](https://honoki.net/2018/12/12/from-blind-xxe-to-root-level-file-read-access/) that I read more than once.

Some people ask me my routine, I don't have one, there is just every week or I read the news of the blog Intigriti (Bug Bytes) because there are always things I missed, otherwise I watch videos or read books / writeups according to my motivation or the subject I'm working on.

Ah one last thing, because a lot of people ask me "how to start making money with bugbounty" don't make bugbounty for money, make bugbounty for knowledge and money will come.

## Conclusion

Hum, a longer article than I had planned, I certainly forgot to note a lot of things, if you have any questions or you want me to complete some parts, don't hesitate to send me a message :)