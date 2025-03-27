var express = require('express');
var router = express.Router();
var catwayService = require('../services/catways');

// Route pour lister tous les catways
router.get('/', catwayService.getAllCatways);

// Route pour récupérer un catway spécifique par son ID
router.get('/:id', catwayService.getCatwayById);

// Route pour créer un nouveau catway
router.post('/', catwayService.createCatway);

// Route pour mettre à jour un catway existant
router.put('/:id', catwayService.updateCatway);

// Route pour supprimer un catway spécifique
router.delete('/:id', catwayService.deleteCatway);

module.exports = router;
