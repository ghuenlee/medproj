var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var server = express();
mongoose.connect('mongodb://admin:admin@ds133378.mlab.com:33378/medproj');

// ======================== Configuration

mongoose.Promise = global.Promise;
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());
server.use(express.static("public"));
server.set('view engine', 'pug');

// ========================= Routes

var indexRoutes = require('./routes/index.js');
var patientsRoutes = require('./routes/patientsRoutes.js');
var dossiersRoutes = require('./routes/dossiersRoutes.js');
var notesRoutes = require('./routes/notesRoutes.js');
var rdvRoutes = require('./routes/rdvRoutes.js');
server.use('/', indexRoutes);
server.use('/patients', patientsRoutes);
server.use('/dossiers', dossiersRoutes);
server.use('/notes', notesRoutes);
server.use('/rdvs', rdvRoutes);

// ========================== Error handling

server.use(function (req, res, next) {
    res.status(404);
    res.send('Error, Not Found!');
});
// ========================= Server

var PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('Server started on port:', PORT);
})