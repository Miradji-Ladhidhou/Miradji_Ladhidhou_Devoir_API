// Importation des modules nécessaires
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Importation du module dotenv
const dotenv = require('dotenv');
dotenv.config();


// Importation du routeur d'authentification
const authRouter = require('./routes/auth');


// Importation des routeurs et de la base de données
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongodb = require('./db/mongo');
var { version } = require('os');
var reservationsRouter = require('./routes/reservations');
var catwaysRoutes = require('./routes/catways');

// Initialisation de la connexion à la base de données
mongodb.initClientDbConnection();

// Création de l'application Express
var app = express();

// Configuration des middlewares
app.use(cors({
    exposedHeaders:['authorization'],
    origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Définition des routes de l'application
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', reservationsRouter);
app.use('/catways', catwaysRoutes);
app.use('/auth', authRouter);

// Gestion des erreurs 404
app.use(function(req, res, next){
    res.status(404).json({name: 'API', version: '1.0', status: 404, message: 'not_found'});
});

// Exportation de l'application
module.exports = app;
