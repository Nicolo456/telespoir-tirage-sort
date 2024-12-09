const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const nocache = require('nocache');
// const cors = require('cors');
const port = 3000;

const START_TIME = formatDateYYMMDD(new Date());
const LOG_PATH = "logs/";

// app.use(cors()); // Pour activer CORS
app.use(express.json()); // Pour parser les requêtes JSON
app.use(nocache()); // Pour désactiver le cache

app.post('/save', (req, res) => { // Route pour enregistrer le vainqu 
    const { variable } = req.body; // Récupère la variable depuis la requête
    if (!variable) {
        return res.status(400).send('Aucune variable à enregistrer.');
    }

    const now = new Date()
    lineStr = '[Winner ' + now.toLocaleString() + '] ' + variable + '\n';

    // Écrit la variable dans un fichier
    fs.appendFile(LOG_PATH+"result_"+START_TIME+'.txt', lineStr, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur lors de l\'enregistrement.');
        }
        res.send('Variable enregistrée avec succès !');
    });
});

function formatDateYYMMDD(date) {
    const pad = (num) => String(num).padStart(2, '0'); // Helper function to pad single digits
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    const month = pad(date.getMonth() + 1); // Months are zero-indexed
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
}


// Utiliser express.static pour servir des fichiers statiques à partir du dossier 'public'
app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
    console.log('\nServeur en écoute sur '+'\x1b[32m%s\x1b[0m',`http://localhost:${port}`);
});