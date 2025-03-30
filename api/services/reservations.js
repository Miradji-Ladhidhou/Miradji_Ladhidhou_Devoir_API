var Reservation = require('../models/reservation');

// 🔹 Lister toutes les réservations d'un catway
exports.getAllByCatway = async (req, res) => {
    try {
        var reservations = await Reservation.find({ catwayNumber: req.params.id });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Récupérer une réservation spécifique
exports.getById = async (req, res) => {
    try {
        var reservation = await Reservation.findOne({ 
            _id: req.params.idReservation, 
            catwayNumber: req.params.id 
        });
        if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Ajouter une réservation à un catway
exports.add = async (req, res) => {
    try {
        var newReservation = new Reservation({ ...req.body, catwayNumber: req.params.id });
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 🔹 Modifier une réservation
exports.update = async (req, res) => {
    try {
        var reservation = await Reservation.findOneAndUpdate(
            { _id: req.params.idReservation, catwayNumber: req.params.id },
            req.body,
            { new: true, runValidators: true } // Retourne la version mise à jour
        );
        if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Supprimer une réservation
exports.delete = async (req, res) => {
    try {
        var reservation = await Reservation.findOneAndDelete({
            _id: req.params.idReservation,
            catwayNumber: req.params.id
        });
        if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.json({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
