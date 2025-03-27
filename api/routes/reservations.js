const express = require('express');
const router = express.Router();
const reservationService = require('../services/reservations');

// Routes
router.get('/catways/:id/reservations', reservationService.getAllByCatway);
router.get('/catways/:id/reservations/:idReservation', reservationService.getById);
router.post('/catways/:id/reservations', reservationService.add);
router.put('/catways/:id/reservations/:idReservation', reservationService.update);
router.delete('/catways/:id/reservations/:idReservation', reservationService.delete);

module.exports = router;
