var mongoose = require('mongoose');
var shortid = require('shortid');

var patientSchema = mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    nom: String,
    pnom: String,
    dateNaiss: Date,
    lieuRes: String
});

var Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;