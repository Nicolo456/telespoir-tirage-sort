# Tirage au sort

> [!TIP]
> Pour l'utiliser, il faut lancer un server local (index.html comme main). Pour ca, 2 propositions:
>
> - Utiliser l'extension vs-code `live-server` [Lien vers la boutique](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server). Le site est ensuite accessible à l'url `http://127.0.0.1:3000/index.html`.
> - Utiliser un server python avec la commande (lancé dans le répertoire du server) `python3 -m http.server`. Le site est ensuite accessible à l'url `localhost:8000`.

> [!WARNING]
> Ne pas oublier de vider le cacher de la page pour actualiser les participants.

## Cahier des charges:

> Faire un outil de tirage au sort qu’on puisse projeter pour la tomPotla (il s’agit de la tombola organisée pendant le pot Télespoir du 19/01)
>
> L’entrée se fera à l’aide d’un sheet (excel, csv) en effet, ils achèteront leurs billet sur le site du BDE, ou une cagnotte de l’asso (Lydia)
>
> on souhaite gérer surtout la partie tirage au sort avec animation, sachant qu’il peut y avoir plusieurs vainqueurs et ça serait bien de les garder affichés tout en tirant les uns après les autres

## Description pratique

Il faut enregistrer les participants et les lots dans le fichier data.js (c'est pas pratique oui mais j'ai pas réussi autrement).

- La liste partcipants accepte les noms des partcipants
- Pour les lots on a: nom du lot, nombre disponible, importance du lot, chemin vers l'image, vainqueurs

L'importance du lot définit quelle sera le niveau d'animation. Un petit lot (3) ne va pas provoquer la même attente qu'un grand lot (1). Pour lancer le lot 1: gros bouton rouge
La colonne vainqueur sera complété par le script avec les noms des participants qui ont gagné le lot.

## TODO

- [x] crée les bases du site
- [x] définir une animation de victoire simple
- [x] mettre des boutons pour relancer un lot (change le vainqueur)
- [ ] mettre des boutons pour relancer une animation (ne change pas le vainqueur)
- [ ] mettre des boutons pour passer au lot suivant
- [ ] faire un recap des vainqueurs à la fin
- [ ] définir une animation par importance du lot
