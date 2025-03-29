var express = require('express');
var router = express.Router();
var reservationService = require('../services/reservations');

// 🔹 Route pour récupérer toutes les réservations d'un catway
router.get('/catways/:id/reservations', reservationService.getAllByCatway);

// 🔹 Route pour récupérer une réservation spécifique
router.get('/catways/:id/reservations/:idReservation', reservationService.getById);

// 🔹 Route pour créer une nouvelle réservation
router.post('/catways/:id/reservations', reservationService.add);

// 🔹 Route pour mettre à jour une réservation
router.put('/catways/:id/reservations/:idReservation', reservationService.update);

// 🔹 Route pour supprimer une réservation
router.delete('/catways/:id/reservations/:idReservation', reservationService.delete);

module.exports = router;
