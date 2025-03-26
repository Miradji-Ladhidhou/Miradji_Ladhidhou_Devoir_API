// Fichier de configuration de l'application express
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// Importation des routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongodb = require('./db/mongo');
const { version } = require('os');

mongodb.initClientDbConnection();

// Création de l'application express
var app = express();

// Déclaration des middlewares utilisateur par l'application
app.use(cors({
    exposedHeaders:['authorization'],
    origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(function(req, res, next){
    res.status(404).json({name: 'API', version: '1.0', status: 404, message: 'not_found'});
});

// exportation de l'application qui sera utilisée par le fichier www qui démarre le serveur
module.exports = app;
