const Reservation = require('../models/Reservation');

// Lister les réservations d'un catway
exports.getAllByCatway = async (req, res) => {
    try {
        const reservations = await Reservation.find({ catwayId: req.params.id });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une réservation spécifique d'un catway
exports.getById = async (req, res) => {
    try {
        const reservation = await Reservation.findOne({ _id: req.params.idReservation, catwayId: req.params.id });
        if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter une réservation à un catway
exports.add = async (req, res) => {
    try {
        const newReservation = new Reservation({ ...req.body, catwayId: req.params.id });
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Modifier une réservation
exports.update = async (req, res) => {
    try {
        const reservation = await Reservation.findOneAndUpdate(
            { _id: req.params.idReservation, catwayId: req.params.id },
            req.body,
            { new: true }
        );
        if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer une réservation d'un catway
exports.delete = async (req, res) => {
    try {
        const reservation = await Reservation.findOneAndDelete({ _id: req.params.idReservation, catwayId: req.params.id });
        if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.json({ message: 'Réservation supprimée' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
