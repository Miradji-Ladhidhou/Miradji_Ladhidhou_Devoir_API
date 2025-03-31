var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Afficher tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { users });
    } catch (err) {
        console.error("Erreur récupération utilisateurs :", err);
        res.status(500).send("Erreur serveur");
    }
});

// Afficher le formulaire pour ajouter un utilisateur
router.get('/new', (req, res) => {
    res.render('newUser'); // Assure-toi d'avoir un fichier views/newUser.ejs
});

// Ajouter un nouvel utilisateur
router.post('/', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        
        if (!username || !email || !password || !role) {
            return res.status(400).send("Tous les champs sont requis.");
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("Cet email est déjà utilisé.");
        }

        const newUser = new User({ username, email, password, role });
        await newUser.save();
        res.redirect('/users');
    } catch (err) {
        console.error("Erreur ajout utilisateur :", err);
        res.status(500).send("Erreur serveur");
    }
});

// Afficher le formulaire de modification
router.get('/edit/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).send("Utilisateur non trouvé.");
        res.render('editUser', { user }); // Assure-toi d'avoir un fichier views/editUser.ejs
    } catch (err) {
        console.error("Erreur récupération utilisateur :", err);
        res.status(500).send("Erreur serveur");
    }
});

// Modifier un utilisateur
router.post('/edit/:email', async (req, res) => {
    try {
        const { username, role } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { email: req.params.email },
            { username, role },
            { new: true } // Retourner le nouvel utilisateur mis à jour
        );

        if (!updatedUser) return res.status(404).send("Utilisateur non trouvé.");

        res.redirect('/users');
    } catch (err) {
        console.error("Erreur mise à jour utilisateur :", err);
        res.status(500).send("Erreur serveur");
    }
});

router.get('/details/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).send("Utilisateur non trouvé.");

        res.render('userDetail', { user }); // Assure-toi d’avoir le fichier views/userDetail.ejs
    } catch (err) {
        console.error("Erreur récupération utilisateur :", err);
        res.status(500).send("Erreur serveur");
    }
});

// Supprimer un utilisateur
router.get('/delete/:email', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ email: req.params.email });
        if (!deletedUser) return res.status(404).send("Utilisateur non trouvé.");

        res.redirect('/users');
    } catch (err) {
        console.error("Erreur suppression utilisateur :", err);
        res.status(500).send("Erreur serveur");
    }
});


module.exports = router;
