var express = require('express');
var router = express.Router();
var Catway = require('../models/catway'); // Modèle Catway MongoDB

// Afficher tous les catways dans la view
router.get('/', async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catways', { catways }); // Affiche la vue EJS
    } catch (err) {
        console.error("Erreur récupération catways :", err);
        res.status(500).send("Erreur serveur");
    }
});

// Afficher le formulaire pour ajouter un catway
router.get('/new', (req, res) => {
    res.render('newCatway');
});

// Ajouter un nouveau catway
router.post('/', async (req, res) => {
    try {
        const { catwayNumber, catwayType, catwayState } = req.body;
        if (!catwayNumber || !catwayType || !catwayState) {
            return res.status(400).send("Tous les champs sont requis.");
        }

        const newCatway = new Catway({ catwayNumber, catwayType, catwayState });
        await newCatway.save();
        res.redirect('/catways'); // Redirige vers la liste des catways
    } catch (err) {
        console.error("Erreur ajout catway :", err);
        res.status(500).send("Erreur serveur");
    }
});

// Afficher le détail d'un catway
router.get('/:id', async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) return res.status(404).send("Catway non trouvé.");
        res.render('catwayDetail', { catway });
    } catch (err) {
        console.error("Erreur récupération catway :", err);
        res.status(500).send("Erreur serveur");
    }
});

// Modifier uniquement l’état d’un catway
router.post('/edit/:id', async (req, res) => {
    try {
        const { catwayState } = req.body;
        await Catway.findByIdAndUpdate(req.params.id, { catwayState });
        res.redirect('/catways'); // Retour à la liste des catways
    } catch (err) {
        console.error("Erreur mise à jour catway :", err);
        res.status(500).send("Erreur serveur");
    }
});

// Supprimer un catway
router.get('/delete/:id', async (req, res) => {
    try {
        await Catway.findByIdAndDelete(req.params.id);
        res.redirect('/catways'); // Redirection après suppression
    } catch (err) {
        console.error("Erreur suppression catway :", err);
        res.status(500).send("Erreur serveur");
    }
});

module.exports = router;
