// Importation du module Express pour créer un routeur
var express = require('express');
var router = express.Router();

// Importation du fichier de gestion des routes des utilisateurs
var userRoute = require('../routes/users');

// Importation du module mongoose 
var { version } = require('mongoose');

/**
 * Route principale de l'API
 * @route GET /
 * @param {Object} req - L'objet de requête
 * @param {Object} res - L'objet de réponse
 * @returns {void}
 * @description Cette route renvoie la page d'accueil de l'API, affichée par `index.ejs`.
 */
router.get('/', (req, res) => {
  res.render('index.ejs');
});

/**
 * Inclusion des routes spécifiques aux utilisateurs sous le préfixe "/users"
 * @route /users
 * @description Permet de gérer toutes les actions liées aux utilisateurs, comme l'inscription, la connexion, etc.
 */
router.use('/users', userRoute);

// Exportation du routeur pour qu'il puisse être utilisé ailleurs dans l'application
module.exports = router;
