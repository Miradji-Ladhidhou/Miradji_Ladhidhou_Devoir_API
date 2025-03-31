var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation');

// Afficher toutes les réservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.render('reservations', { reservations });
    } catch (err) {
        console.error("Erreur récupération réservations :", err);
        res.status(500).send("Erreur serveur");
    }
});

// Afficher le formulaire pour ajouter une réservation
router.get('/new', (req, res) => {
    res.render('newReservation');
});

// Ajouter une nouvelle réservation
router.post('/', async (req, res) => {
    try {
        const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;
        if (!catwayNumber || !clientName || !boatName || !startDate || !endDate) {
            return res.status(400).send("Tous les champs sont requis.");
        }

        const newReservation = new Reservation({ catwayNumber, clientName, boatName, startDate, endDate });
        await newReservation.save();
        res.redirect('/reservations');
    } catch (err) {
        console.error("Erreur ajout réservation :", err);
        res.status(500).send("Erreur serveur");
    }
});

// Afficher les détails d'une réservation
router.get('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findOne({ _id: req.params.id });
        if (!reservation) return res.status(404).send("Réservation non trouvée.");
        res.render('reservationDetail', { reservation });
    } catch (err) {
        console.error("Erreur récupération réservation :", err);
        res.status(500).send("Erreur serveur");
    }
});

// Modifier une réservation
router.post('/edit/:id', async (req, res) => {
    try {
        const { clientName, boatName, startDate, endDate } = req.body;
        await Reservation.findOneAndUpdate({ _id: req.params.id }, { clientName, boatName, startDate, endDate });
        res.redirect('/reservations');
    } catch (err) {
        console.error("Erreur mise à jour réservation :", err);
        res.status(500).send("Erreur serveur");
    }
});

// Supprimer une réservation par catwayNumber
router.get('/delete/:id', async (req, res) => {
    try {
        await Reservation.findOneAndDelete({ _id: req.params.id });
        res.redirect('/reservations');
    } catch (err) {
        console.error("Erreur suppression réservation :", err);
        res.status(500).send("Erreur serveur");
    }
});

router.get('/en-cours', async (req, res) => {
    try {
        const today = new Date();
        const reservations = await Reservation.find({
            startDate: { $lte: today }, // La réservation a déjà commencé
            endDate: { $gte: today }   // La réservation n'est pas encore terminée
        });

        res.render('dashboard', { reservations });
    } catch (err) {
        console.error("Erreur récupération réservations en cours :", err);
        res.status(500).send("Erreur serveur");
    }
});



module.exports = router;
