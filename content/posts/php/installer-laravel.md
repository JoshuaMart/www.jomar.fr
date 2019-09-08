---
title: "[FR] - Installer Laravel 6 - Debian10 / Nginx"
date: 2019-09-08T10:52:31+02:00
draft: false
---

Ayant récemment repris un peu le PHP, je vous propose ce tuto pour une installation de **Laravel 6** sur Debian 10 avec Nginx & PHP-FPM.  
Dans ce tutoriel nous aborderons les points suivants :  

1. [Mise à jour du serveur](#etape1)
2. [Installation de Nginx, PHP-FPM 7.3, MariaDB](#etape2)  
  2.1 [Configuration de PHP & MariaDB](#etape21)
3. [Créer la base de donnée](#etape3)
4. [Installation de composer](#etape4)
5. [Configuration de Nginx & création du vHost](#etape5)  
  5.1 [Créer le certificat SSL Let's Encrypt](#etape51)  
  5.2 [Subtilité pour un projet utilisant VueJS](#etape52)
6. [Création de votre premier projet Laravel](#etape6)
7. [Fin](#etape7)

## Prérequis :
Pour ce tutoriel j'utilise un serveur DEV1-S avec Debian 10 de chez Scaleway (2core / 2GB de RAM), je vous recommande d'avoir au moins 2GB de RAM, sinon ça peut parfois être galère lors de l'utilisation de composer.

![](/images/2019/php/laravel_hostnamectl.png)

Il vous faudra également un domaine avec une entrée DNS pointant sur votre votre serveur.

## Etape 1 - Mise à jour du serveur <a name="etape1"></a>
Comme toujours, la première étape consiste à s'assurer que son serveur est à jour.
```bash
apt-get update && apt-get upgrade -y
```

## Etape 2 - Installation de Nginx, PHP-FPM 7.3 & MariaDB <a name="etape2"></a>
Par habitude et meilleur maîtrise, je préfère utiliser Nginx que PHP, la suite de ce tutoriel se concentrera donc sur la configuration de Nginx.
```bash
apt-get install nginx php-fpm mariadb-server mariadb-client
```

On installe également les modules PHP qui pourront être utiles/nécessaires à Laravel.
```bash
apt-get -y install unzip zip nginx php7.3 php7.3-mysql php7.3-fpm php7.3-mbstring php7.3-xml php7.3-curl
```

### Etape 2.1 - Configuration de PHP & MariaDB <a name="etape21"></a>
Avec un éditeur, ouvrez le fichier /etc/php/7.3/fpm/php.ini et modifier les valeurs suivantes :
```bash
memory_limit = 256M       #Ligne 406 => Permet d'augmenter la mémoire limite qu'un script est autorisé à utiliser
upload_max_filesize = 64M #Ligne 845 => Permet d'augmenter la taille des fichiers uploadés
cgi.fix_pathinfo=0        #Ligne 797 => Permet d'éviter que PHP-FPM corrige les chemins qui lui sont envoyé et donc éviter l'éxécution de scripts non désirés
```

Ensuite, on effectue la configuration de MariaDB grâce à la commande suivante qui permet de mettre un mot de passe root, supprimer les utilisateurs anonymes, interdire la connexion root à distance, etc... :
```bash
mysql_secure_installation
```
 
Voici ce que je vous préconise comme réponse aux questions :
```bash
Set root password? [Y/n] Y
Remove anonymous users? [Y/n] Y
Disallow root login remotely? [Y/n] Y
Remove test database and access to it? [Y/n] Y
Reload privilege tables now? [Y/n] Y
```

## Etape 3 - Créer la base de donnée <a name="etape3"></a>
Votre projet Laravel utilisera certainement une base de données, nous pouvons donc directement la créée ainsi qu'un utilisateur qui sera dédié à cette base :
```bash
mysql -u root -p
mysql> CREATE DATABASE projet1DB;
mysql> CREATE USER 'projet1_user'@'localhost' IDENTIFIED BY 'password';
mysql> GRANT ALL PRIVILEGES ON projet1DB.* TO 'projet1_user'@'localhost';
mysql> FLUSH PRIVILEGES;
mysql> exit
```

## Etape 4 - Installer composer <a name="etape4"></a>
Composer est le logiciel de gestion de dépendances PHP le plus utilisé, il permet de facilement déclarer/installer les bibliothèques nécessaires aux différents projets.  
La commande suivante installera composer en version 1.8.4 :
```bash
apt-get install composer -y
```

Si jamais vous souhaitez obtenir la dernière version de composer (1.9 à la date d'écriture de cet article), vous pouvez l'installer de cette manière :
```bash
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/bin --filename=composer
```

## Etape 5 - Configuration de Nginx & création du vHost <a name="etape5"></a>
Afin de partir sur une bonne base, vous pouvez utiliser le site [nginxconfig.io](https://nginxconfig.io).  
Remplissez les différents champs avec les informations de votre site, la seule modification que j'ai effectuée qui n'est pas visible c'est dans l'onglet "HTTPS" ou j'ai seulement renseigné mon adresse mail pour Let's Encrypt

![](/images/2019/php/laravel_nginxconfig.png)

Globalement, vous pouvez utilisez la configuration générée par l'outil, pour ma part, je retire seulement les éléments let's encrypt pour gérer cette partie par moi-même et je modifie la version de PHP dans le fichier ```/etc/nginx/nginxconfig.io/php_fastcgi.conf```pour correspondre à la version PHP installer et je ne créer pas le fichier ```/etc/nginx/nginxconfig.io/letsencrypt.conf```

```bash
nano /etc/nginx/sites-available/laravel.jomar.ovh.conf
# Je supprime la ligne contenant : include nginxconfig.io/letsencrypt.conf
```

Vous pouvez également ajouter le header ```Feature-Policy``` qui est un nouvel en-tête qui permet à un site de contrôler quelles fonctionnalités et APIs peuvent être utilisées dans le navigateur.  
Pour ce faire, ouvrez le fichier ```/etc/nginx/nginxconfig.io/security.conf``` et ajouter la ligne suivante :
```bash
add_header Feature-Policy "midi none;notifications none;push none;sync-xhr none;microphone none;camera none;magnetometer none;gyroscope none;speaker self;vibrate none;fullscreen self;payment none;";
```

### Etape 5.1 - Créer le certificat SSL Let's Encrypt <a name="etape51"></a>
On créer la clé d'échange Diffie-Hellman :
```bash
openssl dhparam -out /etc/nginx/dhparam.pem 4096
```

On installe certbot pour créer le certificat Let's Encrypt
```bash
apt-get install certbot python-certbot-nginx 
```

On créer le certificat
```bash
systemctl stop nginx
certbot certonly --standalone -d laravel.jomar.ovh --rsa-key-size=4096
```

N'oubliez pas de créer le lien symbolique de votre configuration Nginx et de redémarrer Nginx :
```bash
sudo ln -s /etc/nginx/sites-available/laravel.jomar.ovh.conf /etc/nginx/sites-enabled/
systemctl start nginx
```

### Etape 5.2 - Subtilité pour un projet utilisant VueJS <a name="etape52"></a>
Lorsque vous utilisez laravel, il est possible que votre site utilise VueJS, en tout cas, par défaut, c'est le cas, cependant, notre configuration Nginx actuelle ne nous permet pas d'afficher les éléments VueJS (vous aurez une page blanche), pour ce faire il faut ajouter la directive ```unsafe-eval``` dans les paramètres de CSP du fichier ```/etc/nginx/nginxconfig.io/security.conf```. Votre fichier ressemblera donc à ça au final :

```bash
# security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
add_header Feature-Policy "midi none;notifications none;push none;sync-xhr none;microphone none;camera none;magnetometer none;gyroscope none;speaker self;vibrate none;fullscreen self;payment none;";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# . files
location ~ /\.(?!well-known) {
        deny all;
}
```

Cette configuration vous permettra d'obtenir un A+ sur [ssllabs.com](https://www.ssllabs.com/ssltest/) et un A sur [securityheaders.com](https://securityheaders.com) (Pour obtenir un A+ il faudrait retirer les directives ```unsafe-inline```et ```unsafe-eval```).

Je ne vais pas détailler chaque header de sécurité, mais globalement cela vous permet d'avoir une meilleure protection, de plus, de nombreux acteurs du web poussent pour plus de sécurité, l'intérêt d'avoir une bonne configuration peut donc être également SEO, je ferais peut-être un article à l'avenir sur l'utilité de chaque header de sécurité.

![](/images/2019/php/laravel_ssllabs.png)

![](/images/2019/php/laravel_securityheaders.png)

## Etape 6 - Création de votre premier projet Laravel <a name="etape6"></a>
Créer & placer vous dans le dossier de votre site web défini dans votre vHost nginx.
```bash
mkdir /var/www/laravel.jomar.ovh
cd /var/www/laravel.jomar.ovh
```

Créer votre projet laravel grâce à composer :
```bash
composer create-project laravel/laravel .
```

Une terminé, n'oubliez pas d'attribuer le dossier à l'utilisateur www-data :
```bash
chown -R www-data:www-data /var/www/laravel.jomar.ovh
```

Vous avez maintenant une configuration fonctionnelle de Laravel
![](/images/2019/php/laravel_finish.png)

## Fin <a name="etape7"></a>

Dans un prochain tutoriel nous verrons comment installer le système d'authentification proposé par Laravel ainsi que comment mieux sécuriser les cookies du site.