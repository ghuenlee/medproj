var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds133378.mlab.com:33378/medproj');
mongoose.Promise = global.Promise;
var Note = require('./models/note.js');
var Dossier = require('./models/dossier.js');

// Remove notes:
Dossier.find(function (err, dossiers) {
    dossiers.forEach = function (dossier) {
        dossier.notes = [];
        dossier.save();
    }
    console.log('All notes removed from Dossiers');
    console.log('Proceding with purging notes collection ...');
    Note.remove(function (err) {
        if (err) {
            return console.log(err);
        }
        return console.log('Note collection purged.');
    })
});