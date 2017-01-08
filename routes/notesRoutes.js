var Router = require('express').Router();
var Note = require('../models/note.js');
// GET all Notes
Router.get('/', function (req, res) {
    Note.find(function (err, Notes) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check your server logs!'
            });
            next();
        }
        if (Notes.length === 0) {
            res.status(404).json({
                message: 'No Notes found in the database!'
            });
        } else {
            res.status(200).json(Notes);
        }
    })
});
// GET ONE Note with ID
Router.get('/:id', function (req, res) {
    var ID = req.params.id;
    Note.find({
        _id: ID
    }, function (err, Note) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check your server logs!'
            });
            next();
        }
        if (Note === null) {
            res.status(404).json({
                message: 'No Note found with ID: ' + ID + '!'
            });
        } else {
            res.status(200).json(Note);
        }
    })
});
// POST NEW Note
Router.post('/', function (req, res) {
    var newNote = new Note({
        titre: req.body.titre,
        contenu: req.body.contenu
    });

    newNote.save(function (err, results) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check your server logs!'
            });
            next();
        }
        res.status(200).json({
            message: 'Insertion succeeded',
            inserted_data: results
        });
    })
});
// UPDATE Note iwth ID
Router.put('/:id', function (req, res) {
    var ID = req.params.id;
    Note.findOne({
        _id: ID
    }, function (err, Note) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check your server logs!'
            });
            next();
        }
        if (Note === null) {
            res.status(404).json({
                message: 'No Note found with ID: ' + ID + '!'
            });
        } else {
            Note.titre = req.body.titre || Note.titre;
            Note.contenu = req.body.contenu || Note.contenu;

            Note.save(function (err) {
                if (err) {
                    console.log(err.stack);
                    res.status(500).json({
                        message: 'Error! check your server logs!'
                    });
                    next();
                }
                res.status(200).json({
                    message: 'Note updated successfully!',
                    updatedData: Note
                });
            });
        }
    });
});
// DELETE Note with ID
Router.delete('/:id', function (req, res) {
    Note.findByIdAndRemove(req.params.id, function (err, deletedNote) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check your server logs!'
            });
            next();
        }
        if (deletedNote !== null) {
            res.status(200).json({
                message: 'Note deleted successfully!',
                deletedNote: deletedNote
            });
        } else {
            res.status(404).json({
                message: 'No Note with the id: ' + req.params.id + ' was found!'
            });
        }
    });
});
module.exports = Router;