import re
import csv
PATH_CSV_EXTES = "BDE Télécom Paris-extés.csv"
PATH_CSV_TICKETS = "BDE Télécom Paris-tickets.csv"
PATH_CSV_TP_EXTES = "BDE Télécom Paris-TP_Extés.csv"
PATH_res = "data_participants.js"

res_d = "export let data_participants = ["
res_f = "];"

prix_ticket_place_tp = {
    "0": 0,
    "8": 1,
    "11": 3,
    "16": 6,
    "22": 11,
}
prix_ticket_place_extes = {
    "11": 1,
    "13": 3,
    "19": 6,
    "25": 11
}
prix_ticket = {
    "2": 1,
    "3": 2,
    "8": 5,
    "14": 10
}


def get_data_from_csv(path: str) -> list:
    # Ouvrir le fichier CSV et lire les colonnes
    with open(path, mode='r') as file:
        csv_reader = csv.reader(file)
        # Passer l'entête si nécessaire
        next(csv_reader)

        # Récupérer les colonnes 1 et 2
        return [(row[0], row[1], row[5], row[8]) for row in csv_reader]


data_extes = get_data_from_csv(PATH_CSV_EXTES)
data_tickets = get_data_from_csv(PATH_CSV_TICKETS)
data_tp_extes = get_data_from_csv(PATH_CSV_TP_EXTES)

data = []

for item in data_extes:
    nb_tombola = prix_ticket_place_extes[item[3]]
    data.append([item[0], item[1], nb_tombola])

for item in data_tickets:
    nb_tombola = prix_ticket[item[3]]
    data.append([item[0], item[1], nb_tombola])

for item in data_tp_extes:
    if item[2] == "1":  # Extés
        nb_tombola = prix_ticket_place_tp[item[3]]
    else:
        nb_tombola = prix_ticket_place_extes[item[3]]
    data.append([item[0], item[1], nb_tombola])


def clean_dashes(text: str) -> str:
    """
    Remplace toutes les occurrences de "--" ou "- -" par "-" dans une chaîne donnée.
    """
    return re.sub(r'--|- -', '-', text)


# Écrire dans le fichier JS
with open(PATH_res, mode='w') as js_file:
    js_file.write(res_d)
    for item in data:
        data_participant = f'{{name:"{
            item[0].title() + " "+clean_dashes(item[1]).title()}", times:{item[2]}}},\n'+'\t'*8
        js_file.write(data_participant)
    js_file.write(res_f)

print("Les données ont été écrites dans le fichier .js.")
