var express = require('express');
var router = express.Router();
var User = require('../models/user');

/**
 * Route pour afficher tous les utilisateurs.
 * @route GET /users
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {void} - Affiche la vue 'users' avec la liste des utilisateurs.
 * @throws {Error} - En cas d'erreur lors de la récupération des utilisateurs.
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { users });
    } catch (err) {
        console.error("Erreur récupération utilisateurs :", err);
        res.status(500).send("Erreur serveur");
    }
});

/**
 * Route pour afficher le formulaire de création d'un nouvel utilisateur.
 * @route GET /users/new
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {void} - Affiche la vue 'newUser' pour ajouter un utilisateur.
 */
router.get('/new', (req, res) => {
    res.render('newUser'); 
});

/**
 * Route pour ajouter un nouvel utilisateur dans la base de données.
 * @route POST /users
 * @param {Object} req - L'objet de requête HTTP contenant les informations de l'utilisateur.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {void} - Redirige vers la liste des utilisateurs après ajout.
 * @throws {Error} - En cas d'erreur lors de l'ajout d'un utilisateur.
 * @description Cette route crée un nouvel utilisateur et le sauvegarde dans la base de données.
 */
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

/**
 * Route pour afficher le formulaire de modification d'un utilisateur.
 * @route GET /users/edit/:email
 * @param {Object} req - L'objet de requête HTTP contenant l'email de l'utilisateur à modifier.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {void} - Affiche la vue 'editUser' avec les données de l'utilisateur à modifier.
 * @throws {Error} - En cas d'erreur lors de la récupération de l'utilisateur.
 */
router.get('/edit/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).send("Utilisateur non trouvé.");
        res.render('editUser', { user }); 
    } catch (err) {
        console.error("Erreur récupération utilisateur :", err);
        res.status(500).send("Erreur serveur");
    }
});

/**
 * Route pour modifier un utilisateur existant.
 * @route POST /users/edit/:email
 * @param {Object} req - L'objet de requête HTTP contenant les informations mises à jour de l'utilisateur.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {void} - Redirige vers la liste des utilisateurs après modification.
 * @throws {Error} - En cas d'erreur lors de la mise à jour.
 * @description Cette route permet de mettre à jour les informations d'un utilisateur existant dans la base de données.
 */
router.post('/edit/:email', async (req, res) => {
    try {
        const { username, role } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { email: req.params.email },
            { username, role },
            { new: true }
        );

        if (!updatedUser) return res.status(404).send("Utilisateur non trouvé.");

        res.redirect('/users');
    } catch (err) {
        console.error("Erreur mise à jour utilisateur :", err);
        res.status(500).send("Erreur serveur");
    }
});

/**
 * Route pour afficher les détails d'un utilisateur.
 * @route GET /users/details/:email
 * @param {Object} req - L'objet de requête HTTP contenant l'email de l'utilisateur.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {void} - Affiche la vue 'userDetail' avec les détails de l'utilisateur.
 * @throws {Error} - En cas d'erreur lors de la récupération des détails de l'utilisateur.
 */
router.get('/details/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).send("Utilisateur non trouvé.");

        res.render('userDetail', { user }); 
    } catch (err) {
        console.error("Erreur récupération utilisateur :", err);
        res.status(500).send("Erreur serveur");
    }
});

/**
 * Route pour supprimer un utilisateur de la base de données.
 * @route GET /users/delete/:email
 * @param {Object} req - L'objet de requête HTTP contenant l'email de l'utilisateur à supprimer.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {void} - Redirige vers la liste des utilisateurs après suppression.
 * @throws {Error} - En cas d'erreur lors de la suppression.
 */
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
