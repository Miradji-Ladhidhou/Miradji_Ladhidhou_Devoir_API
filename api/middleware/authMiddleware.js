var jwt = require('jsonwebtoken');
require('dotenv').config();

// middleware pour vérifier si l'utilisateur est authentifié
var authMiddleware = (req, res, next) => {
  var token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé' });
  }

  try {
    var verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = verified; // L'ID de l'utilisateur est disponible dans req.user
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = authMiddleware;
