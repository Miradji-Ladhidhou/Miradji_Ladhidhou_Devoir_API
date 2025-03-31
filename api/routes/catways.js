var express = require('express');
var router = express.Router();
var Catway = require('../models/catway'); 

/**
 * Afficher tous les catways
 * @route GET /catways
 * @param {Object} req - L'objet de requête
 * @param {Object} res - L'objet de réponse, utilisé pour renvoyer les résultats
 * @returns {Object} catways - Liste des catways à afficher dans la vue
 */
router.get('/', async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catways', { catways }); 
    } catch (err) {
        console.error("Erreur récupération catways :", err);
        res.status(500).send("Erreur serveur");
    }
});

/**
 * Afficher le formulaire pour ajouter un nouveau catway
 * @route GET /catways/new
 * @param {Object} req - L'objet de requête
 * @param {Object} res - L'objet de réponse, utilisé pour afficher le formulaire
 * @returns {void}
 */
router.get('/new', (req, res) => {
    res.render('newCatway');
});

/**
 * Ajouter un nouveau catway
 * @route POST /catways
 * @param {Object} req - L'objet de requête, contenant les informations du catway
 * @param {Object} res - L'objet de réponse, utilisé pour renvoyer les résultats
 * @returns {Object} message - Le message de succès ou d'erreur
 */
router.post('/', async (req, res) => {
    try {
        const { catwayNumber, catwayType, catwayState } = req.body;
        if (!catwayNumber || !catwayType || !catwayState) {
            return res.status(400).send("Tous les champs sont requis.");
        }

        const newCatway = new Catway({ catwayNumber, catwayType, catwayState });
        await newCatway.save();
        res.redirect('/catways'); 
    } catch (err) {
        console.error("Erreur ajout catway :", err);
        res.status(500).send("Erreur serveur");
    }
});

/**
 * Afficher les détails d'un catway spécifique
 * @route GET /catways/:id
 * @param {Object} req - L'objet de requête, contenant l'ID du catway
 * @param {Object} res - L'objet de réponse, utilisé pour renvoyer les résultats
 * @returns {Object} catway - Les détails du catway à afficher dans la vue
 */
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

/**
 * Modifier uniquement l’état d’un catway
 * @route POST /catways/edit/:id
 * @param {Object} req - L'objet de requête, contenant l'ID du catway et l'état à modifier
 * @param {Object} res - L'objet de réponse, utilisé pour renvoyer les résultats
 * @returns {Object} message - Le message de succès ou d'erreur
 */
router.post('/edit/:id', async (req, res) => {
    try {
        const { catwayState } = req.body;
        await Catway.findByIdAndUpdate(req.params.id, { catwayState });
        res.redirect('/catways');
    } catch (err) {
        console.error("Erreur mise à jour catway :", err);
        res.status(500).send("Erreur serveur");
    }
});

/**
 * Supprimer un catway
 * @route GET /catways/delete/:id
 * @param {Object} req - L'objet de requête, contenant l'ID du catway à supprimer
 * @param {Object} res - L'objet de réponse, utilisé pour renvoyer les résultats
 * @returns {void}
 */
router.get('/delete/:id', async (req, res) => {
    try {
        await Catway.findByIdAndDelete(req.params.id);
        res.redirect('/catways'); 
    } catch (err) {
        console.error("Erreur suppression catway :", err);
        res.status(500).send("Erreur serveur");
    }
});

module.exports = router;
