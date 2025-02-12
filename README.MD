# Tirage au sort

Bienvenue sur le dépot du site utilisé pour le tirage au sort téléspoir. En cas de problème veuillez contacter l'administrateur de téléspoir. Site crée originalement par Nicodème Gorge de la promo 2026.

## Logiciel nécessaire

- Git (Gestionnaire de version)
- npm (Gestionnaire de package pour le web)

## Utilisation

### Démarrage Rapide

- Cloner le dépot `git clone https://github.com/Nicolo456/telespoir-tirage-sort.git`
- Déplacer vous dans le dossier
- Installer les dépendances `npm i`
- Changer le nom des participants dans le fichier `data_participants.js` qui se trouve dans le dossier `public/config`.
- Lancer le site web `npm run start`.

### Configuration en détail

- Cloner le dépot `git clone https://github.com/Nicolo456/telespoir-tirage-sort.git`
- Déplacer vous dans le dossier
- Installer les dépendances `npm i`
- Changer le nom des participants dans le fichier `data_participants.js` qui se trouve dans le dossier `public/config`. Pour cela 2 possibilités:
  - Soit en changeant manuellement
  - Soit en modifiant le script du dossier `script` et ajoutant le `.csv` avec les données des participants. On execute le script `script.py` qui donne un nouveau fichier `data_participants.js` qu'on pourra placer dans `public/config` à la place de l'ancien.
- Changer l'ordre des chansons dans `public/config/data_songs.js`. Les chansons se jouent dans l'ordre d'apparition dans le vecteur.
- Changer le comportement du tirage dans le fichier `public/config/settings.js`.
- Lancer le site web `npm run start`.

## Resultat

Un fichier contenant tous les vainqueurs sera crée dans le dossier `logs`.

## Explication du code

Le server est généré par express dans `server.cjs`. Il génére une api pour recevoir les demande d'enregistrement du nom de vainqueur dans les logs.
Le serveur lance le fichier `index.html` qui utilise les ressources css/images/sounds/javascript du dossier public.
Pour lire le code javascript non compilé par `babel` il faut lire les fichiers du dossier `src`.
