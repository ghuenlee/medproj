var Router = require('express').Router();
var RDV = require('../models/rdv.js');
// GET all RDVs
Router.get('/', function (req, res) {
    RDV.find(function (err, RDVs) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check your server logs!'
            });
            next();
        }
        if (RDVs.length === 0) {
            res.status(404).json({
                message: 'No RDVs found in the database!'
            });
        } else {
            res.status(200).json(RDVs);
        }
    })
});
// GET ONE RDV with ID
Router.get('/:id', function (req, res) {
    var ID = req.params.id;
    RDV.findOne({
        _id: ID
    }).populate("patient").exec(function (err, RDV) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check your server logs!'
            });
            next();
        }
        if (RDV === null) {
            res.status(404).json({
                message: 'No RDV found with ID: ' + ID + '!'
            });
        } else {
            res.status(200).json(RDV);
        }
    })
});
// POST NEW RDV
Router.post('/', function (req, res) {
    var newRDV = new RDV({
        RDVdate: req.body.rdvdate,
        contenu: req.body.contenu,
        patient: req.body.patient
    });

    newRDV.save(function (err, results) {
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
// UPDATE RDV iwth ID
Router.put('/:id', function (req, res) {
    var ID = req.params.id;
    RDV.findOne({
        _id: ID
    }, function (err, RDV) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check your server logs!'
            });
            next();
        }
        if (RDV === null) {
            res.status(404).json({
                message: 'No RDV found with ID: ' + ID + '!'
            });
        } else {
            RDV.contenu = req.body.contenu || RDV.contenu;
            RDV.RDVdate = req.body.rdvdate || RDV.RDVdate;
            RDV.patient = req.body.patient || RDV.patient;

            RDV.save(function (err) {
                if (err) {
                    console.log(err.stack);
                    res.status(500).json({
                        message: 'Error! check your server logs!'
                    });
                    next();
                }
                res.status(200).json({
                    message: 'RDV updated successfully!',
                    updatedData: RDV
                });
            });
        }
    });
});
// DELETE RDV with ID
Router.delete('/:id', function (req, res) {
    RDV.findByIdAndRemove(req.params.id, function (err, deletedRDV) {
        if (err) {
            console.log(err.stack);
            res.status(500).json({
                message: 'Error! check your server logs!'
            });
            next();
        }
        if (deletedRDV !== null) {
            res.status(200).json({
                message: 'RDV deleted successfully!',
                deletedRDV: deletedRDV
            });
        } else {
            res.status(404).json({
                message: 'No RDV with the id: ' + req.params.id + ' was found!'
            });
        }
    });
});
module.exports = Router;