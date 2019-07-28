---
title: "Vulnerability tutorial 01 : Insecure Direct Object Reference"
date: 2019-07-26T18:00:00+02:00
draft: false
---

**Definition :** An IDOR occurs when an application provides direct access to an object via a user input (e. g. an ID), if another user knows this ID they may be able to access this element without having the prior authorization to access it.

This vulnerability is due to the fact that the application takes the entries provided by the user and uses them to retrieve an object without performing enough authorization checks. 

**Exemples :**
![](/images/2019/vulns/idor_schema.png)

An IDOR does not only occur on an object ID, for example in this URL ```https://example.org/changepwd?user=test1``` we can consider that the account name is passed as a parameter to change the password of a user, if you change your account name by that of another user, if no control is performed you can change the password of another user

**Tips :**  
- The best tips I could find is on the [BugBountyNotes](https://www.bugbountynotes.com/training/tutorial?id=2) website :

> 80% of my IDOR findings are from mobile apps. Most mobile apps use a simple API system to log the user in, display their information etc. A lot of API's just take a userid parameter and will usually reveal all their information to you, as shown above in the example.

- It is possible to use the [Autorize](https://portswigger.net/bappstore/f9bbac8c4acf4aefa4d7dc92a991af2f) burp plugin which permit to give to the extension the cookies of a low privileged user and navigate the website with a high privileged user. The extension automatically repeats every request with the session of the low privileged user and detects authorization vulnerabilities.
- An IDOR can be easily found (if the object has a simple ID) but in the case where the object uses a UUID (36 character alpha numeric string which is impossible to guess). You can use to access an object using the UUID of another test account, but the impact of your report will be lower than if you find a way to get the UUIDs of other users. For example if the site allows you to upload an avatar, if you have access to this avatar, the image link can potentially contain the user's UUID.

**Training :**  
For my part, I find that VM [SecurityShepherd](https://github.com/OWASP/SecurityShepherd) offers interesting content for someone who wants to better understand how an IDOR works, by downloading the project you will access at :  
- A quick course explaining what an IDOR is with a guided example.  
- A first challenge where the objective is to transfer money from another bank account to yours.  
- A second challenge or objective is to find a message on a user account that is not listed.  
- A third challenge or objective is also to retrieve a message on a user's profile that is not listed, but this time the user ID is hashed.

**Hackerone IDOR reports :**  
- [IDOR to view User Order Information](https://hackerone.com/reports/287789) : Simple IDOR or the person to iterate on an order ID to obtain user information
- [IDOR- Activate Mopub on different organizations- steal api token- Fabric.io](https://hackerone.com/reports/95552) : The user has the possibility to steal an API token thanks to an IDOR in an organization's ID.


**More ressources :**  
- [OWASP](https://www.owasp.org/index.php/Testing_for_Insecure_Direct_Object_References_(OTG-AUTHZ-004)) - Insecure Direct Object References (OTG-AUTHZ-004)  
- [BugBountyNotes](https://www.bugbountynotes.com/training/tutorial?id=2) - IDOR (Insecure Direct Object Reference)  
- [BugCrowd](https://www.bugcrowd.com/blog/how-to-find-idor-insecure-direct-object-reference-vulnerabilities-for-large-bounty-rewards/) - How to find IDOR for large bounty rewards