import React from 'react'
import dossiersAPI from 'dossiersAPI'
import moment from 'moment'

moment.locale('fr');

var Main = React.createClass({
    getInitialState: () => {
        return {
            dossiers: {},
            error: undefined
        }
    },
    componentDidMount: function () {
        dossiersAPI.getDossiers()
            .then((res) => {
                var dossiers = res;
                this.setState({
                    dossiers: dossiers
                });
            }, (error) => {
                console.log(error);
            });


    },
    render: function () {
        var {dossiers, error} = this.state;
        var renderDossiers = function () {
            if (typeof dossiers !== 'undefined' && dossiers.length > 0) {
                return dossiers.map((dossier) => {
                    var date = moment(dossier.dateCreation).format('Do MMMM YYYY');
                    var divStyle = {
                        padding: "1rem",
                        border: "1px solid lightgrey",
                        margin: "0.5rem",
                        borderRadius: "15px",
                        width: '30%'
                    };
                    return (
                        <div key={dossier.contenu} style={divStyle}>
                            <h4>Dossier:  {dossier._id} </h4>
                            <hr />
                            <p><b>Patient: </b>{dossier.patient[0].nom} {dossier.patient[0].pnom}</p>
                            <p><b>Contenu: </b>{dossier.contenu}</p>
                            <p><b>Date creation: </b>{date}</p>
                        </div >

                    )

                });
            } else {
                return <h2 key='error'>No dossier to display!</h2>
            }

        }
        return (
            <div>
                <h3>Liste des dossiers:</h3>
                {renderDossiers()}
            </div>
        );
    }
});

module.exports = Main;