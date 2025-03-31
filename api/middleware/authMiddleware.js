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
    req.user = verified; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

// Middleware pour vérifier si l'utilisateur est authentifié via session
var requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login'); 
  }
  req.user = { _id: req.session.userId };  
  next();  
};

// Exporter les deux middlewares
module.exports = { authMiddleware, requireAuth };
