var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// Route pour inscrire un utilisateur
router.post('/register', async (req, res) => {
  var { username, email, password } = req.body;

  // Vérifier si l'email existe déjà
  var userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Email déjà utilisé.' });

  // Créer un nouvel utilisateur
  var user = new User({ username, email, password });
  await user.save();

  res.status(201).json({ message: 'Utilisateur créé avec succès.' });
});

// Route pour connecter un utilisateur et générer un JWT
router.post('/login', async (req, res) => {
  var { email, password } = req.body;

  // Vérifier si l'utilisateur existe
  var user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });

  // Vérifier le mot de passe
  var isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });

  // Créer un token JWT
  var token = jwt.sign({ userId: user._id }, 'votre_clé_secrète', { expiresIn: '1h' });

  res.json({ message: 'Connexion réussie', token });
});

module.exports = router;
