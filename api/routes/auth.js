var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
require('dotenv').config(); 

/**
 * Route pour inscrire un utilisateur
 * @route POST /register
 * @param {Object} req - L'objet de requête, contenant les informations de l'utilisateur
 * @param {Object} res - L'objet de réponse, utilisé pour renvoyer les résultats
 * @returns {Object} message - Le message de succès ou d'erreur
 */
router.post('/register', async (req, res) => {
  var { username, email, password } = req.body;

  // Vérifier si l'email existe déjà
  var userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Email déjà utilisé.' });

  // Créer un nouvel utilisateur
  var user = new User({ username, email, password });

  try {
    await user.save(); 
    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error); 
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
  }
});

/**
 * Route de connexion
 * @route POST /login
 * @param {Object} req - L'objet de requête, contenant les informations de connexion
 * @param {Object} res - L'objet de réponse, utilisé pour renvoyer les résultats
 * @returns {Object} message - Le message de succès ou d'erreur
 */
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
    res.cookie("token", token, { httpOnly: true, secure: false });

    // Stocker l'ID utilisateur en session
    req.session.userId = user._id;

    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/**
 * Route de déconnexion
 * @route GET /logout
 * @param {Object} req - L'objet de requête
 * @param {Object} res - L'objet de réponse, utilisé pour renvoyer les résultats
 * @returns {Object} message - Le message de succès ou d'erreur
 */
router.get('/logout', async (req, res) => {
  // Détruire la session de l'utilisateur
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Erreur lors de la déconnexion.");
    }
    // Rediriger vers la page d'accueil (index.ejs)
    res.redirect('/');
  });
});

module.exports = router;
