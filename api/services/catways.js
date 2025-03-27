const Catway = require('../models/catway');

// Fonction pour lister tous les catways
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des catways.' });
  }
};

// Fonction pour récupérer un catway spécifique par son ID
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.status(404).json({ message: 'Catway non trouvé' });
    }
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du catway.' });
  }
};

// Fonction pour créer un nouveau catway
exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;

    // Validation du type et de l'état
    if (!['long', 'short'].includes(catwayType)) {
      return res.status(400).json({ message: 'Le type de catway doit être "long" ou "short".' });
    }

    const newCatway = new Catway({
      catwayNumber,
      catwayType,
      catwayState
    });

    await newCatway.save();
    res.status(201).json(newCatway);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création du catway.' });
  }
};

// Fonction pour mettre à jour un catway existant
exports.updateCatway = async (req, res) => {
  try {
    const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCatway) {
      return res.status(404).json({ message: 'Catway non trouvé' });
    }
    res.json(updatedCatway);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du catway.' });
  }
};

// Fonction pour supprimer un catway spécifique
exports.deleteCatway = async (req, res) => {
  try {
    const deletedCatway = await Catway.findByIdAndDelete(req.params.id);
    if (!deletedCatway) {
      return res.status(404).json({ message: 'Catway non trouvé' });
    }
    res.json({ message: 'Catway supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du catway.' });
  }
};
