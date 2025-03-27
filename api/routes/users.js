var express = require('express');
var router = express.Router();
var service = require('../services/users');

router.get('/', service.getAll); // Lister tous les utilisateurs
router.get('/:email', service.getByEmail); // Récupérer un utilisateur par email
router.post('/', service.add); // Ajouter un utilisateur
router.put('/:email', service.update); // Modifier un utilisateur
router.delete('/:email', service.delete); // Supprimer un utilisateur

module.exports = router;
