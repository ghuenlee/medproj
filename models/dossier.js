var mongoose = require('mongoose');
var shortid = require('shortid');

var dossierSchema = mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    contenu: String,
    dateCreation: {
        type: Date,
        default: Date.now()
    },
    dateModification: {
        type: Date,
        default: null
    },
    notes: [{
        type: String,
        ref: 'Note'
    }],
    patient: [{
        type: String,
        ref: 'Patient'
    }]
});

var Dossier = mongoose.model('Dossier', dossierSchema);

module.exports = Dossier;