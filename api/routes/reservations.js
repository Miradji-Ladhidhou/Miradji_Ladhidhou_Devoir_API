var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation_tmp');

/**
 * Route pour afficher toutes les réservations.
 * @route GET /reservations
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {void} - Affiche une vue avec toutes les réservations.
 * @description Cette route récupère toutes les réservations dans la base de données et les affiche dans la vue 'reservations'.
 */
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.render('reservations', { reservations });
    } catch (err) {
        console.error("Erreur récupération réservations :", err);
        res.status(500).send("Erreur serveur");
    }
});

/**
 * Route pour afficher le formulaire de création d'une nouvelle réservation.
 * @route GET /reservations/new
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {void} - Affiche la vue 'newReservation' pour ajouter une réservation.
 */
router.get('/new', (req, res) => {
    res.render('newReservation');
});

/**
 * Route pour ajouter une nouvelle réservation dans la base de données.
 * @route POST /reservations
 * @param {Object} req - L'objet de requête HTTP contenant les informations de la réservation.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {void} - Redirige vers la liste des réservations après ajout.
 * @throws {Error} - En cas d'erreur lors de l'ajout.
 * @description Cette route crée une nouvelle réservation dans la base de données et redirige vers la page des réservations.
 */
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

/**
 * Route pour afficher les détails d'une réservation spécifique.
 * @route GET /reservations/:id
 * @param {Object} req - L'objet de requête HTTP contenant l'ID de la réservation.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {void} - Affiche la vue 'reservationDetail' avec les détails de la réservation.
 * @throws {Error} - Si la réservation n'est pas trouvée.
 * @description Cette route récupère une réservation spécifique par son ID et l'affiche dans une vue dédiée.
 */
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

/**
 * Route pour modifier une réservation existante.
 * @route POST /reservations/edit/:id
 * @param {Object} req - L'objet de requête HTTP contenant les nouveaux détails de la réservation.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {void} - Redirige vers la page des réservations après mise à jour.
 * @throws {Error} - En cas d'erreur lors de la mise à jour.
 * @description Cette route permet de modifier les informations d'une réservation existante.
 */
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

/**
 * Route pour supprimer une réservation spécifique.
 * @route GET /reservations/delete/:id
 * @param {Object} req - L'objet de requête HTTP contenant l'ID de la réservation à supprimer.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {void} - Redirige vers la page des réservations après suppression.
 * @throws {Error} - En cas d'erreur lors de la suppression.
 * @description Cette route permet de supprimer une réservation existante par son ID.
 */
router.get('/delete/:id', async (req, res) => {
    try {
        await Reservation.findOneAndDelete({ _id: req.params.id });
        res.redirect('/reservations');
    } catch (err) {
        console.error("Erreur suppression réservation :", err);
        res.status(500).send("Erreur serveur");
    }
});

/**
 * Route pour afficher les réservations en cours.
 * @route GET /reservations/en-cours
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {void} - Affiche les réservations en cours dans la vue 'dashboard'.
 * @description Cette route récupère toutes les réservations dont la date de début est antérieure à la date actuelle et
 * dont la date de fin est supérieure ou égale à la date actuelle.
 */
router.get('/en-cours', async (req, res) => {
    try {
        const today = new Date();
        const reservations = await Reservation.find({
            startDate: { $lte: today }, 
            endDate: { $gte: today }  
        });

        res.render('dashboard', { reservations });
    } catch (err) {
        console.error("Erreur récupération réservations en cours :", err);
        res.status(500).send("Erreur serveur");
    }
});

module.exports = router;
