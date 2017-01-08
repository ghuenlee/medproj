var Router = require('express').Router();
var Dossier = require('../models/dossier.js');
var Note = require('../models/note.js');
var Patient = require('../models/patient.js');
// GET all dossiers
Router.get('/', function (req, res) {
    Dossier.find().populate('notes').populate('patient').exec(function (err, dossiers) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check server console for error logs!'
            });
            next();
        }
        if (dossiers.length === 0) {
            res.status(404).json({
                message: 'Error! no dossiers found in database!'
            })
        } else {
            res.status(200).json({
                message: 'Patient(s) retrieved successfully!',
                dossiers: dossiers
            })
        }
    });
});
// GET ONE dossier with ID
Router.get('/:id', function (req, res) {
    var ID = req.params.id;
    Dossier.findById(ID).populate('notes').exec(function (err, foundDossier) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check server console for error logs!'
            });
            next();
        }
        if (foundDossier === null) {
            res.status(404).json({
                message: 'No dossier found with ID: ' + ID + '!'
            })
        } else {
            res.status(200).json({
                message: 'Dossier found!',
                dossier: foundDossier
            })
        }
    });
});
// POST NEW dossier
Router.post('/', function (req, res) {
    var newPatient = new Patient({
        nom: req.body.nom,
        pnom: req.body.pnom,
        dateNaiss: req.body.dateNaiss,
        lieuRes: req.body.lieuRes
    });
    newPatient.save()
    var newDossier = new Dossier({
        contenu: req.body.contenu
    });
    newDossier.patient.push(newPatient);
    newDossier.save(function (err, results) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check server console for error logs!'
            });
            next();
        }
        res.status(200).json({
            message: 'Dossier added successfully!',
            dossier: results
        })
    });
});
// POST NEW note IN dossier
Router.post('/:id/notes', function (req, res) {
    var ID = req.params.id;
    Dossier.findOne({
        _id: ID
    }, function (err, foundDossier) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check server console for error logs!'
            });
            next();
        }
        if (foundDossier === null) {
            res.status(404).json({
                message: 'Error! no dossier found with id: ' + ID
            });
        } else {
            var newNote = new Note({
                titre: req.body.titre,
                contenu: req.body.contenu,
                standalone: false
            });
            newNote.save();
            foundDossier.notes.push(newNote);
            foundDossier.save();
            res.status(200).json({
                message: 'Note added successfully to dossier: ' + foundDossier._id,
                Dossier: foundDossier
            });
        }
    });
});
// UPDATE dossier iwth ID
Router.put('/:id', function (req, res) {
    var ID = req.params.id;
    Dossier.findOne({
        _id: ID
    }, function (err, foundDossier) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check server console for error logs!'
            });
            next();
        }
        if (foundDossier === null) {
            res.status(404).json({
                message: 'No dossier found with ID: ' + ID + '!'
            });
        } else {
            foundDossier.contenu = req.body.contenu || foundDossier.contenu;
            foundDossier.dateModification = Date.now();

            foundDossier.save(function (err) {
                if (err) {
                    console.log(err.stack);
                    res.status(500).json({
                        message: 'Error! check server console for error logs!'
                    });
                    next();
                }
                res.status(200).json({
                    message: 'Dossier updated successfully!',
                    updatedData: foundDossier
                });
            })
        }
    });
});
// DELETE dossier with ID
Router.delete('/:id', function (req, res) {
    Dossier.findByIdAndRemove(req.params.id, function (err, deletedDossier) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check server console for error logs!'
            });
            next();
        }
        if (deletedDossier !== null) {
            res.status(200).json({
                message: 'Dossier deleted successfully!',
                deletedDossier: deletedDossier
            });
        } else {
            res.status(404).json({
                message: 'No dossier with the id: ' + req.params.id + ' was found!'
            });
        }
    });
});


module.exports = Router;