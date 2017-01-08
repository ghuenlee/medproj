var Router = require('express').Router();
var Patient = require('../models/patient.js');
// GET all patients
Router.get('/', function (req, res) {
    Patient.find(function (err, patients) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check your server logs!'
            });
            next();
        }
        if (patients.length === 0) {
            res.status(404).json({
                message: 'No patients found in the database!'
            });
        } else {
            res.status(200).json(patients);
        }
    })
});
// GET ONE patient with ID
Router.get('/:id', function (req, res) {
    var ID = req.params.id;
    Patient.findOne({
        _id: ID
    }, function (err, patient) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check your server logs!'
            });
            next();
        }
        if (patient === null) {
            res.status(404).json({
                message: 'No patient found with ID: ' + ID + '!'
            });
        } else {
            res.status(200).json(patient);
        }
    })
});
// POST NEW patient
Router.post('/', function (req, res) {
    var newPatient = new Patient({
        nom: req.body.nom,
        pnom: req.body.pnom,
        dateNaiss: req.body.dateNaiss,
        lieuRes: req.body.lieuRes
    });

    newPatient.save(function (err, results) {
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
// UPDATE patient iwth ID
Router.put('/:id', function (req, res) {
    var ID = req.params.id;
    Patient.findOne({
        _id: ID
    }, function (err, patient) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check your server logs!'
            });
            next();
        }
        if (patient === null) {
            res.status(404).json({
                message: 'No patient found with ID: ' + ID + '!'
            });
        } else {
            patient.nom = req.body.nom || patient.nom;
            patient.pnom = req.body.pnom || patient.pnom;
            patient.dateNaiss = req.body.dateNaiss || patient.dateNaiss;
            patient.lieuRes = req.body.lieuRes || patient.lieuRes;

            patient.save(function (err) {
                if (err) {
                    console.log(err.stack);
                    res.status(500).json({
                        message: 'Error! check your server logs!'
                    });
                    next();
                }
                res.status(200).json({
                    message: 'Patient updated successfully!',
                    updatedData: patient
                });
            });
        }
    });
});
// DELETE patient with ID
Router.delete('/:id', function (req, res) {
    Patient.findByIdAndRemove(req.params.id, function (err, deletedPat) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check your server logs!'
            });
            next();
        }
        if (deletedPat !== null) {
            res.status(200).json({
                message: 'Patient deleted successfully!',
                deletedPatient: deletedPat
            });
        } else {
            res.status(404).json({
                message: 'No patient with the id: ' + req.params.id + ' was found!'
            });
        }
    });
});
module.exports = Router;