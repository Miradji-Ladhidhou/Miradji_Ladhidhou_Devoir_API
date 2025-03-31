var express = require('express');
var router = express.Router();
const Reservation = require('../models/reservation');
const { requireAuth } = require('../middleware/authMiddleware'); 

/**
 * Route du tableau de bord
 * @route GET /dashboard
 * @param {Object} req - L'objet de requête contenant l'utilisateur authentifié (req.user)
 * @param {Object} res - L'objet de réponse, utilisé pour renvoyer les résultats
 * @returns {void}
 * @throws {500} Erreur serveur en cas de problème lors de la récupération des réservations
 */
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
            user: req.user,
            reservations: reservations 
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des réservations." });
    }
});

module.exports = router;
