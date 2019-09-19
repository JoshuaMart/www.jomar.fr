---
title: "[FR] - Tuto authentification Laravel"
date: 2019-09-08T10:52:31+02:00
draft: false
---

Pour suivre à mon premier article sur [l'installation de Laravel](/2019/installer-laravel/), cet article va vous expliquer comment mettre en place un système d'authentification (Register, Email confirmation, Login, Logout, Forgot Password) sur **Laravel 6**, comment mieux sécurisé les cookies du site et la mise en place de reCaptchaV3 sur vos formulaires.


1. [Mise en place de laravel auth'](#etape1)
2. [Confirmation de compte par mail](#etape2)  
3. [Sécurité des cookies](#etape3)
4. [Google reCaptchaV3](#etape4)
5. [Fin](#etape5)

## Prérequis :
Pour ce tutoriel j'utilise un serveur DEV1-S avec Debian 10 de chez Scaleway (2core / 2GB de RAM), je vous recommande d'avoir au moins 2GB de RAM, sinon ça peut parfois être galère lors de l'utilisation de composer.

![](/images/2019/php/laravel_hostnamectl.png)

Il vous faudra également un domaine avec une entrée DNS pointant sur votre serveur ainsi qu'un serveur web avec Laravel et une base de données MySQL ([Installer NGINX + Laravel 6](/2019/installer-laravel/))

Pour utiliser les composants de ce tutoriel, il sera nécessaire d'installer npm
```bash
apt-get install npm
```

## Etape 1 - Mise en place de laravel auth' <a name="etape1"></a>
La première étape consiste à configurer Laravel pour qu'il puisse communiquer avec votre base de données en modifiant les informations de connexions dans votre fichier ```.env``` à la racine de votre site :
```bash
# nano /var/www/laravel.jomar.ovh/.env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=projet1DB
DB_USERNAME=projet1_user
DB_PASSWORD=password
```

Vous pouvez également en profiter pour modifier la variable ```APP_URL``` & ```APP_NAME``` ligne 1 et 5.  
On installe ensuite la base de notre système d'authentification (Register/Login/Logout/Password Reset) avec trois commandes :
```bash
composer require laravel/ui
php artisan ui vue --auth
npm install && npm run dev
```

La commande suivante va permettre de créer les tables nécessaires au système d'authentification :
```bash
php artisan migrate
```

Avant de tester les nouveaux modules de votre site, je vous préconise de changer le hashing des mots de passe pour utiliser Argon2ID, on édite le fichier ```config/hashing.php``` à la ligne 18 en modifiant tel quel :
```bash
'driver' => 'argon2id',
```

On ne va pas rentrer dans les détails de l'algorithme, mais Argon2ID est l'algorithme de hash recommandé aujourd'hui ! donc, ligne 46 du fichier ```config/hashing.php```, vous trouverez les options de hash pour Argon2, pour ma part voici les options que j'utilise :
```bash
'argon' => [
        'memory' => 4096, #4MB
        'threads' => 2,
        'time' => 10,
    ],
```

Les paramètres correspondent aux points suivants :

- memory : Mémoire max qui peut être utilisée pour calculer le hash
- threads : Nombre de threads à utiliser pour calculer le hash
- time : Temps maximum qu'il faut pour calculer le hash


Vous pouvez maintenant vérifier sur votre site que les onglets "Login" et "Register" sont bien présents et accessibles.
![](/images/2019/php/laravel_register.png)

Pour la suite du tutoriel, afin d'éviter de configurer un serveur SMTP pour la bonne réception des mails, il est possible d'utiliser le service en ligne [mailtrap.io](https://mailtrap.io).  
Une fois inscrit, il suffit de renseigner les paramètres SMTP dans votre fichier ```.env``` :
![](/images/2019/php/laravel_register.png)

## Etape 2 - Confirmation de compte par mail <a name="etape2"></a>
Actuellement, les fonctionnalités de bases sont normalement fonctionnelles, mais il peut-être intéressant de forcer l'utilisateur de confirmer son adresse mail, c'est ce que nous allons voir ici.  
On commence par éditer le fichier ```app/User.php``` comme suit :
```php
<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable;

    //...
```

Ensuite on update la base de données pour inclure la nouvelle colonne ```email_verified_at``` pour stocker la date et l'heure à laquelle l'adresse email a été vérifiée :
```bash
php artisan migrate
```

Ensuite dans le fichier ```routes/web.php``` modifiez la ligne
```php
Auth::routes();
```
par
```php
Auth::routes(['verify' => true]);
```

Ce changement va permettre l'envoi d'email aux comptes quand un nouvel utilisateur est enregistré.  
Maintenant pour éviter que certaines de vos routes soient accessibles par des comptes non vérifiés, on va ajouter le middleware "verified".

Par exemple par défaut, la route /home en modifiant la ligne suivante : (toujours dans routes/web.php)

```php
Route::get('/home', 'HomeController@index')->name('home');
```
par
```php
Route::get('/home', 'HomeController@index')->name('home')->middleware('verified');
```
Voilà, maintenant si vous vous inscrivez sur votre site, vous devrez d'abord confirmer votre inscription avec le lien reçu dans le mail.

## Etape 3 - Sécurité des cookies <a name="etape3"></a>
Les cookies contiennent des informations importantes de l'utilisateur, il est donc important de les sécurisés, Laravel embarque tout un tas de mécanismes prévus pour obtenir le "cookie parfait", tout comme dans le premier tutoriel sur [l'installation de Laravel](/2019/installer-laravel/) et les différents headers de sécurité, je ne vais pas expliquer chaque header de sécurité, je ferais peut-être un autre post plus tard pour les expliquer.

Voici la configuration que je vous préconise, il faut modifier les lignes correspondantes dans le fichier ```config/session.php``` :

```bash
'cookie' => '__Host-sess', #Ligne 127
'secure' => env('SESSION_SECURE_COOKIE', true), #Ligne 166
```
Inutile de modifier les autres paramètres.

Grâce à cette configuration, si vous refaites une passe de [securityheaders.io]() vous pourrez voir le commentaire "Set-Cookie	This cookie has the appropriate flags set." à la fin de la page.

Votre cookie aura la forme :
```bash
__Host-sess={cookie}; expires=Mon, 09-Sep-2019 15:03:11 GMT; Max-Age=7200; path=/; secure; httponly; samesite=strict
```

## Etape 4 - Mise en place de Google reCaptchaV3 <a name="etape4"></a>
Cette étape est plutôt simple à mettre en place et permet une bonne protection contre les bots ou attaques brute-force, pour la mise en place de reCaptchaV3 sur votre site, vous allez installez un module composer comme suit :
```php
composer require biscolab/laravel-recaptcha
```

Puis générer le fichier de configuration dans ```/config``` avec la commande suivante :
```php
php artisan vendor:publish --provider="Biscolab\ReCaptcha\ReCaptchaServiceProvider"
```

Dans le fichier ```config/recaptcha.php```qu'on viens de générer, modifier la version de reCaptcha :
```php
return [
	...
    'version'                       => 'v3', // supported: "v3"|"v2"|"invisible"
    ...
];
```

Ensuite, dans le fichier ```.env```ajouter les lignes suivantes tout en y ajoutant les clés que vous obtiendrez en ajoutant un site sur la console d'administration [google reCaptcha(https://www.google.com/u/1/recaptcha/admin/)
```php
RECAPTCHA_SITE_KEY=YOUR_API_SITE_KEY
RECAPTCHA_SECRET_KEY=YOUR_API_SECRET_KEY
```

On reload ensuite la configuration du site :
```php
php artisan config:cache
```

Puis il ne vous reste plus qu'à ajouter le snippet suivant dans vos pages Laravel ou vous souhaitez avoir reCaptcha d'actif :
```html
{!! htmlScriptTagJsApi([
            'action' => 'homepage'
        ]) !!}
```

Par exemple dans le fichier ```resources/views/layouts/app.blade.php``` à la fin du header :
```html
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    {!! htmlScriptTagJsApiV3([
      'action' => 'homepage'
    ]) !!}
</head>
```

reCaptchaV3 est maintenant actif sur votre site !
![](/images/2019/php/laravel_recaptcha.png)

## Etape 5 - Fin <a name="etape5"></a>
Bon, on est pas mal là, dernier point, je pense que c'est important de ne pas laisser son application en mode debug, dans le fichier ```.env``` on passe donc la variable ```APP_DEBUG``` à false