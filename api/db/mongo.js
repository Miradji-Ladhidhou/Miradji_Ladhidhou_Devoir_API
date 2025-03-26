// Connexion entre la base de données a distance et mon projet.
const mongoose = require('mongoose');


const clientOptions = {
    dbName           : 'apinode',
};

exports.initClientDbConnection = async () => {
    try{
        await mongoose.connect(process.env.URL_MONGO, clientOptions)
        console.log('connected in the base');
    }catch (error){
        console.log(error);
        throw error;
    }
}