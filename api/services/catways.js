const Catway = require('../models/catway');

// Récupérer tous les catways et afficher la vue
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find(); // Récupérer tous les catways depuis MongoDB
        res.render('catways', { catways }); // Rendre la vue EJS
    } catch (error) {
        console.error('Erreur lors de la récupération des catways :', error);
        res.status(500).send("Erreur serveur");
    }
};

// Récupérer un catway spécifique par ID
exports.getCatwayById = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) {
            return res.status(404).send("Catway non trouvé");
        }
        res.json(catway); // Retourner en JSON (si besoin)
    } catch (error) {
        console.error('Erreur lors de la récupération du catway :', error);
        res.status(500).send("Erreur serveur");
    }
};

// Ajouter un nouveau catway
exports.createCatway = async (req, res) => {
    try {
        const { name } = req.body;
        const newCatway = new Catway({ name });
        await newCatway.save();
        res.redirect('/catways'); // Rediriger vers la liste après l'ajout
    } catch (error) {
        console.error('Erreur lors de la création du catway :', error);
        res.status(500).send("Erreur serveur");
    }
};

// Mettre à jour un catway existant
exports.updateCatway = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!updatedCatway) {
            return res.status(404).send("Catway non trouvé");
        }
        res.redirect('/catways'); // Redirection après mise à jour
    } catch (error) {
        console.error('Erreur lors de la mise à jour du catway :', error);
        res.status(500).send("Erreur serveur");
    }
};

// Supprimer un catway
exports.deleteCatway = async (req, res) => {
    try {
        await Catway.findByIdAndDelete(req.params.id);
        res.redirect('/catways'); // Rediriger après suppression
    } catch (error) {
        console.error('Erreur lors de la suppression du catway :', error);
        res.status(500).send("Erreur serveur");
    }
};
