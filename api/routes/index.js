// Importation du module Express pour créer un routeur
var express = require('express');
var router = express.Router();

// Importation du fichier de gestion des routes des utilisateurs
var userRoute = require('../routes/users');

// Importation du module mongoose 
var { version } = require('mongoose');

// Définition de la route principale ("/") qui retourne des informations sur l'API
router.get('/', async (req, res) => {
  res.status(200).json({
    name: process.env.APP_NAME, // Nom de l'application récupéré depuis les variables d'environnement
    version: '1.0', // Version de l'API
    status: 200, // Code de statut HTTP pour indiquer que la requête est réussie
    message: "Bienvenue sur l'API !" // Message de bienvenue
  });
});

// Inclusion des routes spécifiques aux utilisateurs sous le préfixe "/users"
router.use('/users', userRoute);

// Exportation du routeur pour qu'il puisse être utilisé ailleurs dans l'application
module.exports = router;
