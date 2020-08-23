---
title: "[EN] - My bounty infrastructure with Docker"
date: 2020-08-13T21:00:00+02:00
draft: false
tags: ["BugBounty", "Tips", "Tuto", "Docker", "Rengine"]
---

## My bounty infrastructure with Docker
After some problems with Rengine for certificate management and a new service that I want to use, I switched to a full docker infrastructure on my server, apart from the use of a few containers it's my first experience with Docker but after some difficulties I find it rather practical and modular.

So I'm sharing with you today the installation of my bounty infrastructure

## Objective

The following services will be installed on your server :

 - [Traefik](https://docs.traefik.io/) : Container docker of reverse proxy, it will take care of redirecting web traffic to our different containers and it will also manage our SSL certificates via let's encrypt.
 - [XSS-Catcher](https://github.com/daxAKAhackerman/XSS-Catcher) : Container docker for XSS blinds.
 - [Portainer](https://www.portainer.io/) : Container docker to manage other containers via a web interface, optional but rather useful at first I find and it allows you easy access to the logs of your containers, metrics and shells if needed.
 - [PHP & Apache](https://hub.docker.com/_/php) : Container docker PHP / Apache to host files for our different pocs. I use for example a php file to make redictions when I have a SSRF (cf : [Exploiting my first SSRF](https://www.jomar.fr/posts/2020/03/en-exploiting-my-first-ssrf/)).
 - [Rengine](https://github.com/yogeshojha/rengine/): Container docker for subdomain recognition. For functionality reasons, in this tutorial I will use a version that I modified with [Serizao](https://twitter.com/WilliamSerizao)
 - [WebHook](https://github.com/fredsted/webhook.site) : Container docker for use, test and debug Webhooks and HTTP requests

![](/images/2020/tuto/bnty_docker_schema.png)

## Prerequisites
- A Ubuntu 20.04 LTS server with at least 4GB of RAM
	- 2GB can be enough if you just do small scans with Rengine, the more you run concurrent scans on domains with many subdomains, the more resources it will consume, logic ...
- One domain
	- The following DNS entries filled in with :
		- `traefik.your_domain.tld IN A {your_server_ip}`
		- `poc.your_domain.tld IN CNAME traefik.your_domain.tld`
		- `xss.your_domain.tld IN CNAME traefik.your_domain.tld`
		- `recon.your_domain.tld IN CNAME traefik.your_domain.tld`
    - `webhook.your_domain.tld IN CNAME traefik.your_domain.tld`
		- `portainer.your_domain.tld IN CNAME traefik.your_domain.tld`
		- `your_domain.tld CAA 128 issue "letsencrypt.org"`

## Disclaimer
This is my first installation using Docker, so it's quite likely that it can be upgraded. Feel free to let me know if you can advise me. 

It is possible that you may encounter small bugs, for example if the portainer version changes, you will also need to update the version in the `docker-compose.yml` file.

However, as I won't go into details about the different configurations or provide support about Docker on twitter, don't hesitate to send me a tweet if you have a question about a configuration or if certain explanations don't seem clear enough to you.

## Easy install

Download [this script](https://jomar.s3.fr-par.scw.cloud/Public/tuto.sh), modify the two variables `domain` and `email` and run it, it will take care of installing docker and getting the necessary configurations.

Then perform the following commands:
```
cd Traefik && docker-compose up -d
cd ../ && cd Portainer && docker-compose up -d
cd ../ && cd Poc && docker-compose up -d
cd ../ && cd XSS-Catcher && docker-compose up -d
cd ../ && cd Rengine && docker-compose up -d
cd ../ && cd Webhook && docker-compose up -d
```
All of your containers should now be started.

## Configuration of each of the containers
### Traefik
The access to the dashboard is protected by a basic authentication, to access it, generate a login / password via the following command :  
`echo $(htpasswd -nb {your_login} {your_pass}) | sed -e s/\\$/\\$\\$/g`

And change the value of line 26 in the `/root/Traefik/docker-compose.yml` file by the output of the command.

Check that the `/root/Traefik/config/acme.json` file is not empty, if this is the case, check your DNS or make sure it is `chmod 0600`.

The suggested configuration will give you an A+ on [SecurityHeaders](securityheaders.com) (Except for services that use their own configuration ...) and an A on [SSLlabs](https://www.ssllabs.com/) :
![](/images/2020/tuto/bnty_docker_securityheaders.png)

![](/images/2020/tuto/bnty_docker_ssllabs.png)

You can therefore normally access your Traefik dashboard via [https://traefik.your_domain.tld](https://traefik.your_domain.tld).
This dashboard contains information about entry points, routes, middlewares etc... in practice you will probably never go on this dashboard in fact.

![](/images/2020/tuto/bnty_docker_traefik.png)

### Portainer
Not much to say about this container, it allows you to manage your Docker infrastructure. In my case I use it mainly for ergonomics because the tool allows you to simply manage your images, volumes, network, access the container logs, see their resource consumption and if necessary have a shell on the container.

![](/images/2020/tuto/bnty_docker_portainer.png)

Go to [https://portainer.your_domain.tld](https://portainer.your_domain.tld) to configure your administration account.

### Poc
This container uses PHP 7.4 as well as Apache.
In fact, I use it to host my payloads files or for example a PHP file to exploit some SSRF (cf : [Exploiting my first SSRF](https://www.jomar.fr/posts/2020/03/en-exploiting-my-first-ssrf/)).

When the container starts, it will deliver the files that are in the `/root/Poc/www/` directory. So if you want to add files or modify existing ones, this is where you should look. They will be directly available at the root of your domain [https://poc.your_domain.tld](https://poc.your_domain.tld)

### XSS-Catcher
This container allows me to have my own blind-XSS service, as the name of the title indicates, it's [XSS-Catcher](https://github.com/daxAKAhackerman/XSS-Catcher).

This container takes a good ten minutes to start the first time, so be patient. Then, all you need to do is go to [https://xss.your_domain.tld](https://xss.your_domain.tld) and log in with the `admin / xss` credentials to start using the service.

![](/images/2020/tuto/bnty_docker_xss.png)

### Rengine
The container that gave me the most trouble, but also the one I needed the most ...

As explained at the beginning of this article, I'm using a modified version with [Serizao](https://twitter.com/WilliamSerizao) at the moment because we have added services that are not yet included in the base repository.

I also made several modifications on my side to make it work via Traefik. The basic problem is that the container uses its own reverse proxy that initially manages SSL certificates, except that it doesn't work on Firefox, so I modified the configuration of the Rengine Nginx container to work via Traefik.

Why keep a second reverse proxy would you tell me ? simply because without it you won't have CSS / JS. I didn't look too much but it seems that for example on the login, Rengine checks that you are authenticated before loading the static files, which is of course not the case, the Nginx reverse proxy makes sure to overload its files so that they are returned to you.

Anyway, not very clean but I hope we'll solve this soon with the PRs coming :)

First, put yourself in the `/root/Rengine` directory and issue the following command:
```
docker-compose up -d
make logs
```
You should get some errors:

![](/images/2020/tuto/bnty_docker_rengine_errors.png)

Then perform the following command to retrieve the ID of the container rengine_web_1 (column NAMES) :
```
docker ps -a
```
Then perform the following commands:
```
docker exec -ti {ID_CONTAINER} "/bin/sh"
python manage.py makemigrations --merge
```

Respond yes, do CTRL+D to escape the container, restart it and you can now create your user:
```
docker-compose restart
make username
```

Rengine will be accessible via [https://recon.your_domain.tld](https://recon.your_domain.tld)

## Webhook
Pretty handy if you don't have access to burp collaborator or if you don't want to use it. It can also make it easier to manage if you have several requests to make and it's more ergnomic.

![](/images/2020/tuto/bnty_docker_webhook.png)

Webhook will be accessible via [https://webhook.your_domain.tld](https://webhook.your_domain.tld)

## Add a new container
In case you want to add a new container, here's what you need to do.

Open the docker-compose.yml of your new service and add the following lines : (If needed, take the example of the containers we just installed :) )
```yml
networks: #If the line doesn't exist add the, otherwise add only the network
      - traefik-proxy
[...]
    #Don't forget to change {services} by your services name, {your_sub_domain.tld} by your subdomain and {port} by the port on which the service is normally listening
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.{services}.entrypoints=http"
      - "traefik.http.routers.{services}.rule=Host(`{your_sub_domain.tld}`)"
      - "traefik.http.middlewares.{services}-https-redirect.redirectscheme.scheme=https"
      - "traefik.http.routers.{services}.middlewares=secured@file"
      - "traefik.http.routers.{services}-secure.entrypoints=https"
      - "traefik.http.routers.{services}-secure.rule=Host(`{your_sub_domain.tld}`)"
      - "traefik.http.routers.{services}-secure.tls=true"
      - "traefik.http.routers.{services}-secure.tls.certresolver=http"
      - "traefik.http.routers.{services}-secure.service={services}"
      - "traefik.http.services.{services}.loadbalancer.server.port={port}"
      - "traefik.docker.network=traefik-proxy"
[...]
#At the end of file
networks:
  traefik-proxy:
    name: traefik-proxy
```
In case your service exposes a port, for example via the `port: 8000:8000` directive, you can remove the line, it's managed by Traefik :)


## Backup & conclusion
I went from a Proxmox / LXC installation to a full Docker installation and this was not planned but it also makes my backups a lot easier.

I use a service like "Bucket S3" on Scaleway. And instead of backing up my LXC containers and sending them on my bucket (which is quite a lot of weight) I just have to send my docker-composites, configuration files and the files I want to back up.

This also facilitates restoration in the event of a complete crash. Rather than reinstalling a Proxmox and reimporting each LXC container, I just have to unroll the script that is at the beginning of this tutorial on a new server.