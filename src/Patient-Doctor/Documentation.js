import React, { Component } from "react";
import "../css/Documentation.css";
import { Link } from "react-router-dom";

class Documentation extends Component {
  state = {
    documents: []
  };

  componentDidMount() {
    fetch("https://medical-documentation.herokuapp.com/documentation")
      .then(result => result.json())
      .then(data => this.setState({ documents: data }));

    //TODO sort by date
  }

  sort = (a, b) => {
    a.date = a.date.split("-").join("");
    b.date = b.date.split("-").join("");
    return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
  };

  render() {
    //this.state.documents.sort();

    return (
      <div className="container documentation-container">
        {this.props.activeAccount === "doctor" && (
          <Link to="documentation/create-new">
            <button>Dodaj wynik badania</button>
          </Link>
        )}
        <form className="filterForm">
          <label>
            Filtruj po tagu:{" "}
            <select name="tags">
              <option value="all">Wszystko</option>
              <option value="blood-test">Badanie krwi</option>
              <option value="usg">Badanie USG</option>

              <option value="ekg">Badanie EKG</option>
              <option value="echo">Echo serca</option>
              <option value="imaging">Obrazowanie medyczne (TK/MRI)</option>
              <option value="angiography">Angiografia / Koronarografia</option>
              <option value="cardiology">Kardiologiczne</option>
            </select>
          </label>
          <label>
            Filtruj po dacie: od <input type="date" /> do <input type="date" />
          </label>
          <input type="submit" value="Filtruj" />
        </form>
        <div className="documents content">
          <ul>
            {this.state.documents.map((document, i) => {
              return (
                <li key={i}>
                  <Link
                    style={{ fontWeight: "600", textDecoration: "underline" }}
                    to={`/documentation/document${document._id}`}
                  >
                    {document.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Documentation;
