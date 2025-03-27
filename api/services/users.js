var User = require('../models/user');// Import du modèle User

// Récupérer tous les utilisateurs
exports.getAll = async (req, res) => {
    try {
        var users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un utilisateur par email
exports.getByEmail = async (req, res) => {
    try {
        var user = await User.findOne({ email: req.params.email });
        user ? res.json(user) : res.status(404).json({ message: "Utilisateur non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter un utilisateur
exports.add = async (req, res) => {
    try {
        var newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modifier un utilisateur par email
exports.update = async (req, res) => {
    try {
        var updatedUser = await User.findOneAndUpdate(
            { email: req.params.email },
            req.body,
            { new: true }
        );
        updatedUser ? res.json(updatedUser) : res.status(404).json({ message: "Utilisateur non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un utilisateur par email
exports.delete = async (req, res) => {
    try {
        var deletedUser = await User.findOneAndDelete({ email: req.params.email });
        deletedUser ? res.json({ message: "Utilisateur supprimé" }) : res.status(404).json({ message: "Utilisateur non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
