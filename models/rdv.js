var mongoose = require('mongoose');
var shortid = require('shortid');

var rdvSchema = mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    RDVdate: Date,
    contenu: String,
    completed: {
        type: Boolean,
        default: false
    },
    patient: [{
        type: String,
        ref: 'Patient'
    }]

});

var RDV = mongoose.model('RDV', rdvSchema);

module.exports = RDV;