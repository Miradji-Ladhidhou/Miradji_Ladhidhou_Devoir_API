const mongoose = require('mongoose'); // Import de mongoose

// Création du schéma de données pour les utilisateurs
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Export du modèle
module.exports = mongoose.model('User', userSchema);
