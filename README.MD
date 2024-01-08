# Tirage au sort

Qu'est ce que fait le script:

Le programme accepte 2 bases de données (format JSON):
- Une base de données avec les noms des participants (sur une colonne) => "participants.json"
- Une base de données avec les différents lots (nom du lot, nombre disponible, importance du lot, vainqueurs) => "lots.json"

L'importance du lot définit quelle sera le niveau d'animation. Un petit lot (3) ne va pas provoquer la même attente qu'un grand lot (1).
La colonne vainqueur sera complété par le script avec les noms des participants qui ont gagné le lot.

TODO
- 