var mongoose = require('mongoose');
var shortid = require('shortid');

var noteSchema = mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    titre: String,
    contenu: String,
    standalone: {
        type: Boolean,
        default: true
    },
    dateCreation: {
        type: Date,
        default: Date.now()
    },
    dateModification: Date
});

var Note = mongoose.model('Note', noteSchema);

module.exports = Note;