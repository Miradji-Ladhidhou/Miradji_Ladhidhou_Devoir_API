const jwt = require('jsonwebtoken');
require('dotenv').config();


// Middleware pour vérifier si l'utilisateur est authentifié via JWT
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Stocke l'utilisateur vérifié dans req.user
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

// Middleware pour vérifier si l'utilisateur est authentifié via session
var requireAuth = (req, res, next) => {
  // Assure-toi que l'utilisateur est authentifié via session
  if (!req.session.userId) {
    return res.redirect('/login');  // Si non authentifié, redirige vers login
  }
  // Assure-toi que l'ID de l'utilisateur existe dans la session
  req.user = { _id: req.session.userId };  // Ajouter l'ID de l'utilisateur dans req.user
  next();  // Passe à la route suivante
};

// Exporter les deux middlewares
module.exports = { authMiddleware, requireAuth };
