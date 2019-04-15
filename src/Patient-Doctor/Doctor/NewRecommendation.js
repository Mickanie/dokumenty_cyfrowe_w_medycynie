import React, { Component } from "react";
import { Link } from "react-router-dom";
import { today, threeDaysAgo } from '../../DateParser'

class NewRecommendationForm extends Component {
  state = {
    dataSaved: false,

    doctor: "",
    content: ""
  };
  

  toggleSave = e => {
    e.preventDefault();

    const { date, content } = e.target.parentElement;

    this.setState({
      dataSaved: !this.state.dataSaved,
      content: content.value,
      date: date.value
    });
  };


  render() {


    return (

   
      <div className="container form-container">
        <h2>Nowe zalecenie</h2>
        <Link
          to="/recommendations"
          className="backButton"
          style={{ position: "absolute", top: "200px", left: "170px" }}
        >
          <button>Powrót</button>
        </Link>
        <form>
          <label>
            Data:
            <input type="date" disabled={this.state.dataSaved} name="date" id="date" min={threeDaysAgo} max={today} defaultValue={today} />
          </label> 
           <label>
            Treść: <textarea disabled={this.state.dataSaved} name="content" />
          </label>

          <input
            type="submit"
            value={this.state.dataSaved ? "Edytuj" : "Zapisz"}
            onClick={this.toggleSave}
          />
        </form>

        <p>
          Wygeneruj załącznik:{" "}
          <Link to="/recommendations/create-new/generate-prescription">
            <button style={{ margin: "10px", width: "150px" }}>Recepta</button>
          </Link>
          <Link to="/recommendations/create-new/generate-sickleave">
            <button style={{ margin: "10px", width: "150px" }}>
              Zwolnienie
            </button>
          </Link>
          <Link to="/recommendations/create-new/generate-referral">
            <button style={{ margin: "10px", width: "150px" }}>
              Skierowanie
            </button>
          </Link>
          <Link to="/recommendations/create-new/generate-lab-order">
            <button style={{ margin: "10px", width: "150px" }}>
              Zlecenie badania
            </button>
          </Link>
        </p>
        <button className="submit-button">Dodaj zalecenie</button>
      </div>
    );
  }
}

export default NewRecommendationForm;
