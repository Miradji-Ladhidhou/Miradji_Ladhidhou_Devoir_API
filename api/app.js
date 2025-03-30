// Importation des modules nécessaires
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');


require('dotenv').config();

// Création de l'application Express
var app = express();

// Importation des routeurs et de la base de données
const authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongodb = require('./db/mongo');
var reservationsRouter = require('./routes/reservations');
var catwaysRoutes = require('./routes/catways');


mongodb.initClientDbConnection();

//ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes de l'application
app.use(cors({
    exposedHeaders:['authorization'],
    origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 // 1 heure
    }
}));


var dashboardRouter = require('./routes/dashboard');
app.use('/', dashboardRouter);



//Route pour la page d'accueil
app.get('/', (req, res, next) => {
    res.render('index');
});


// Définition des routes
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
