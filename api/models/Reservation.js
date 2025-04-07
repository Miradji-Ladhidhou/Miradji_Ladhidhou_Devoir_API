var mongoose = require('mongoose');

var reservationSchema = new mongoose.Schema({
    catwayNumber: { 
        type: Number,
        required: true 
    }, 
    clientName: { 
        type: String,
        required: true,
        trim: true 
    }, 
    boatName: { 
        type: String,
        required: true,
        trim: true 
    }, 
    startDate: { 
        type: Date,
        required: true
     },
    endDate: { 
        type: Date,
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    } 
});

// Empêcher une réservation où endDate est avant startDate
reservationSchema.pre('save', function (next) {
    if (this.endDate < this.startDate) {
        return next(new Error("La date de fin ne peut pas être avant la date de début"));
    }
    next();
});

module.exports = mongoose.model('Reservation', reservationSchema);
