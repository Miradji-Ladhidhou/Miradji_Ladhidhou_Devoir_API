var mongoose = require('mongoose'); // Import de mongoose
var bcrypt = require('bcrypt'); // Import de bcrypt

// Création du schéma de données pour les utilisateurs
var userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Middleware pour hasher le mot de passe avant de l'enregistrer
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    var salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Méthode pour comparer le mot de passe
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Export du modèle
var User = mongoose.model('User', userSchema);
module.exports = User;
