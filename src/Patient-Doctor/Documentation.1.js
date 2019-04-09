import React, { Component } from "react";
import "../css/Documentation.css";
import { Link } from "react-router-dom";

class Documentation extends Component {
  state = {
    documents: [
      {
        title: "Wynik badania krwi 2019-03-15",
        documentType:"blood-test",
        id: 1,
        content: "Tabelka HTML z badaniami"
      },
      {
        title: "Konsultacja kardiologiczna 2019-01-17",
        documentType: "consultation",
        id: 2,
        content: "Opis wizyty u kardiologa"
      },

      {
        title: "Wynik badania USG 2018-12-11",
        documentType: "usg",
        id: 3,
        content: "USG opis"
      },
      {
        title: "Wynik badania EKG 2018-09-22",
        documentType: "ekg",
        id: 4,
        content: "EKG zrobione!"
      }
    ]
  };
  render() {
    return (
      <div className="container documentation-container">
        {this.props.activeAccount === "doctor" && (
          <Link to="documentation/create-new">
            <button>Dodaj dokument</button>
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
                    to={`/documentation/document${document.id}`}
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
