const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors()); // Pour activer CORS
app.use(express.json()); // Pour parser les requêtes JSON

app.post('/save', (req, res) => {
    const { variable } = req.body; // Récupère la variable depuis la requête
    if (!variable) {
        return res.status(400).send('Aucune variable à enregistrer.');
    }

    const now = new Date()
    lineStr = '[Winner ' + now.toLocaleString() + '] ' + variable + '\n';

    // Écrit la variable dans un fichier
    fs.appendFile('result.txt', lineStr, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur lors de l\'enregistrement.');
        }
        res.send('Variable enregistrée avec succès !');
    });
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});