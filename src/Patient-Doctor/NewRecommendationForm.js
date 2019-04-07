import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewRecommendationForm extends Component {
    render() {
        return (
            <div className="container form-container">
            <h2>Nowe zalecenie</h2>
            <Link to="/recommendations" className="backButton" style={{ position: "absolute", top: "200px", left: "170px" }}><button>Powrót</button></Link>
                <form>
                    <label>Data: <input type="date"></input></label>
                    <label>Lekarz: <input type="text"></input></label>
                    <label>Treść: <textarea></textarea></label>
              
                   
                    <input type="submit" value="Zapisz"></input>
                </form>

                <p>Załączniki: <Link style={{margin: "10px"}} to="/recommendations/create-new/generate-prescription"><button>Wygeneruj receptę</button></Link>
                <Link style={{margin: "10px"}} to="/recommendations/create-new/generate-sickleave"><button>Wygeneruj zwolnienie</button></Link>
                <Link style={{margin: "10px"}} to="/recommendations/create-new/generate-referral"><button>Wygeneruj skierowanie</button></Link></p>
                <button>Dodaj zalecenie</button>
            </div>
        );
    }
}



export default NewRecommendationForm;