var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
require('dotenv').config(); // Charger les variables d'environnement

// Route pour inscrire un utilisateur
router.post('/register', async (req, res) => {
  var { username, email, password } = req.body;

  // Vérifier si l'email existe déjà
  var userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Email déjà utilisé.' });

  // Créer un nouvel utilisateur
  var user = new User({ username, email, password });

  try {
    await user.save();  // Sauvegarde dans la base de données
    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);  // Affiche l'erreur
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Email ou mot de passe incorrect." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Email ou mot de passe incorrect." });

    // Générer un token JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Stocker le token dans un cookie sécurisé
    res.cookie("token", token, { httpOnly: true, secure: false }); // Secure: true en production

    // Stocker l'ID utilisateur en session
    req.session.userId = user._id;

    res.redirect('/dashboard'); // Redirection après connexion
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// Déconnexion (le client doit supprimer le token)
router.get('/logout', async (req, res) => {
  res.json({ message: 'Déconnexion réussie. Supprimez le token côté client.' });
});

module.exports = router;
