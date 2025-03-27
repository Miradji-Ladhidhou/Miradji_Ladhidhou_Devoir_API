const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    catwayNumber: { type: Number, required: true },  // Numéro du catway réservé
    clientName: { type: String, required: true, trim: true },  // Nom du client
    boatName: { type: String, required: true, trim: true },  // Nom du bateau
    startDate: { type: Date, required: true },  // Date de début
    endDate: { type: Date, required: true },  // Date de fin
    createdAt: { type: Date, default: Date.now }  // Date d’enregistrement
});

// Empêcher une réservation où endDate est avant startDate
ReservationSchema.pre('save', function (next) {
    if (this.endDate < this.startDate) {
        return next(new Error("La date de fin ne peut pas être avant la date de début"));
    }
    next();
});

module.exports = mongoose.model('Reservation', ReservationSchema);
