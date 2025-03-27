var jwt = require('jsonwebtoken');

// middleware pour vérifier si l'utilisateur est authentifié
var authMiddleware = (req, res, next) => {
  var token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé' });
  }

  try {
    var decoded = jwt.verify(token, 'votre_clé_secrète');
    req.user = decoded; // L'ID de l'utilisateur est disponible dans req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = authMiddleware;
