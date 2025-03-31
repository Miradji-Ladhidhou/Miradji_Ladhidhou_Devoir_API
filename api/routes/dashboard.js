var express = require('express');
var router = express.Router();
const Reservation = require('../models/reservation');
const { requireAuth } = require('../middleware/authMiddleware'); // Middleware pour vérifier l'authentification

// Route du tableau de bord
router.get('/dashboard', requireAuth, async (req, res) => {
    try {
        const today = new Date();
        
        // Récupérer les réservations en cours
        const reservations = await Reservation.find({
            startDate: { $lte: today },
            endDate: { $gte: today }
        });

        // Afficher les réservations dans le dashboard
        res.render('dashboard', {
            user: req.user, // Informations de l'utilisateur connecté
            reservations: reservations // Réservations en cours
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des réservations." });
    }
});

module.exports = router;
