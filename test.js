var dossiersAPI = require('./app/api/dossiersAPI.jsx');

dossiersAPI.getDossiers()
    .then((dossiers) => {
        console.log(typeof dossiers);
        console.log(dossiers[0].patient[0].nom);
    }, (error) => {
        console.log(error);
    });