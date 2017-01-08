var Router = require('express').Router();
var Patient = require('../models/patient.js');

Router.get('/', function (req, res) {
    res.render('index');
});
module.exports = Router;