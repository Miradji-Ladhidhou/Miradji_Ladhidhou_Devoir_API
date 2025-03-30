// Importation du module Express pour créer un routeur
var express = require('express');
var router = express.Router();

// Importation du fichier de gestion des routes des utilisateurs
var userRoute = require('../routes/users');

// Importation du module mongoose 
var { version } = require('mongoose');

// Définition de la route principale ("/") qui retourne des informations sur l'API
router.get('/', (req, res) => {
  res.render('index.ejs');
});

// Inclusion des routes spécifiques aux utilisateurs sous le préfixe "/users"
router.use('/users', userRoute);

// Exportation du routeur pour qu'il puisse être utilisé ailleurs dans l'application
module.exports = router;
