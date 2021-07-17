---
title: "My methodology during Firstblood"
date: 2021-07-17T10:00:00+01:00
hero: article_banner.png
description: My bounty infrastructure
menu:
  sidebar:
    name: My bounty infrastructure
    identifier: My bounty infrastructure
    weight: 2
---

## My methodology during Firstblood

Hello everyone
From the 9th to the 16th of May the first live event of BugBountyHunter took place, namely Firstblood.

Of course I participated. For this first event I was in collaboration with my bugbounty mate Serizao, but I greatly thank's all hunters I exchanged with during the event. I strongly believe that collaboration is the key, and the proof is that this is a team that finished on the podium.

To return to the target, it was only 1 domain. The website was rather simple, not 10 000 pages nor 200 features but had 17 bugs (16 voluntary and 1 involuntary).

    1 open redirect
    5 Reflected XSS
    3 Stored XSS
    2 IDOR
    2 Business logic error
    3 Auth issue
    1 information leak

Before starting the event I set myself 2 goals

    Find all the bugs except XSS (this is not my favorite bug)
    Don't use any tool except burp and don't use any "active" extension

