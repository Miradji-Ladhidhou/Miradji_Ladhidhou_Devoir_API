// Importation du module Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définition des options de connexion à la base de données
const clientOptions = {
    dbName: 'apinode', // Nom de la base de données à utiliser
};

// Fonction pour initialiser la connexion à la base de données MongoDB
exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions);
        
        console.log('connected in the base');
    } catch (error) {
        console.log(error);
        
        throw error;
    }
};
