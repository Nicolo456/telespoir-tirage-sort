import re
import csv
PATH_CSV = "collect.csv"
PATH_res = "data.js"

res_d = "export let participants = ["
res_f = "];"


# Fonction qui renvoie True si "Pas de Kebab" est trouvé dans la chaîne

def contains_not_contains_de_kebab(s: str) -> bool:
    return not "Pas de Kebab" in s

# Fonction qui renvoie le numéro dans la chaîne (par exemple "10 kebabs" renverra 10)


def extract_number(s: str) -> int:
    match = re.search(r'\d+', s)
    return int(match.group()) if match else 0


# Ouvrir le fichier CSV et lire les colonnes
with open(PATH_CSV, mode='r') as file:
    csv_reader = csv.reader(file)
    # Passer l'entête si nécessaire
    next(csv_reader)

    # Récupérer les colonnes 1 et 2
    data = [(row[0], row[1], row[4], row[9]) for row in csv_reader]

# Écrire dans le fichier JS
with open(PATH_res, mode='w') as js_file:
    js_file.write(res_d)
    for item in data:
        nb_tombola = int(contains_not_contains_de_kebab(
            item[2])) + extract_number(item[3])
        for i in range(nb_tombola):
            js_file.write(f'"{item[1] + " "+item[0]}",')
    js_file.write(res_f)

print("Les données ont été écrites dans le fichier .js.")
