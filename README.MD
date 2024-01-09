# Tirage au sort

> [!WARNING]
> Il faut autoriser la lecture automatique de musique pour le site (paramètre)

## Cahier des charges:
>Faire un outil de tirage au sort qu’on puisse projeter pour la tomPotla (il s’agit de la tombola organisée pendant le pot Télespoir du 19/01)
>
>L’entrée se fera à l’aide d’un sheet (excel, csv) en effet, ils achèteront leurs billet sur le site du BDE, ou une cagnotte de l’asso (Lydia) 
>
>on souhaite gérer surtout la partie tirage au sort avec animation, sachant qu’il  peut y avoir plusieurs vainqueurs et ça serait bien de les garder affichés tout en tirant les uns après les autres

## Description pratique
Le programme accepte 2 bases de données (format JSON):
- Une base de données avec les noms des participants (sur une colonne) => "participants.json"
- Une base de données avec les différents lots (nom du lot, nombre disponible, importance du lot, chemin vers l'image, vainqueurs) => "lots.json"

L'importance du lot définit quelle sera le niveau d'animation. Un petit lot (3) ne va pas provoquer la même attente qu'un grand lot (1). Pour lancer le lot 1: gros bouton rouge
La colonne vainqueur sera complété par le script avec les noms des participants qui ont gagné le lot.


## TODO
- [ ] crée les bases du site
- [ ] définir une animation de victoire simple
- [ ] mettre des boutons pour relancer un lot (change le vainqueur)
- [ ] mettre des boutons pour relancer une animation (ne change pas le vainqueur)
- [ ] mettre des boutons pour passer au lot suivant
- [ ] faire un recap des vainqueurs à la fin
- [ ] définir une animation par importance du lot