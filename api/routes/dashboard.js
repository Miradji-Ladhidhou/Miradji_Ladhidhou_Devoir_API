var express = require('express');
var router = express.Router();
const Reservation = require('../models/reservation');
const { requireAuth } = require('../middleware/authMiddleware'); // Middleware pour vérifier l'authentification

// Route du tableau de bord

router.get('/dashboard', requireAuth, async (req, res) => {
    try {
      // Récupérer les réservations de l'utilisateur connecté
      const reservations = await Reservation.find({ userId: req.user._id });
  
      // Rendre la vue dashboard avec les réservations récupérées
      res.render('dashboard', {
        user: req.user, // Passer les informations de l'utilisateur
        reservations: reservations // Passer les réservations à la vue
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations :", error);
      res.status(500).json({ message: "Erreur lors de la récupération des réservations." });
    }
  });

module.exports = router;
