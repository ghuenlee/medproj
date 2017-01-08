var axios = require('axios');

var URL = 'http://localhost:3000/';
var patientsURL = 'http://localhost:3000/patients/';
var dossiersURL = 'http://localhost:3000/dossiers/';
var notesURL = 'http://localhost:3000/notes/';

module.exports = {
    getDossiers: () => {
        return axios.get(dossiersURL)
            .then((results) => {
                var dossiers = results.data.dossiers;
                return dossiers;
            }, (err) => {
                return err;
            });
    }

}


// axios.post(URL + 'dossiers', {
//     nom: 'Mira',
//     pnom: 'Jargon',
//     dateNaiss: 1992 - 10 - 16,
//     lieuRes: 'Mariana, Caolumbia',
//     contenu: 'Nothing special, really.'
// }).then(function (res) {
//     console.log(res.data);
// }).catch(function (err) {
//     console.log(err);
// })

// axios.get(URL + 'patients').then(function (res) {
//     console.log(res.data);
// }).catch(function (err) {
//     console.log(err);
// });

// axios.post(URL + 'dossiers/BJxRS5kaBg/notes', {
//     titre: 'Just a note from axios',
//     contenu: 'Hey sweetheart!'
// }).then((res) => {
//     console.log(res.data);
// }).catch((err) => {
//     console.log(err);
// })

// function getDossier(ID) {
//     axios.get(dossiersURL + ID)
//         .then(res => {
//             return console.log(res.data);
//         })
//         .catch(err => {
//             return console.log(err);
//         });
// }


