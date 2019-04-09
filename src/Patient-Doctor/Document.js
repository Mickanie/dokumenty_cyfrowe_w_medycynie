import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Document.css";

class Document extends Component {
  state = {
    documents: [
      {
        title: "Wynik badania krwi 2019-03-15",
        documentType: "blood-test",
        id: 1,
        content: [
          {
            name: "HDL",
            amount: 12
          },
          {
            name: "LDL",
            amount: 100
          },
          {
            name: "HGB",
            amount: 13
          },
          {
            name: "RBC",
            amount: 400
          }
        ]
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
    const index = this.props.match.params.documentId - 1;

    return (
      <div className="container document-container">
        <Link
          to="/documentation"
          className="backButton"
          style={{ position: "absolute", top: "200px", left: "170px" }}
        >
          <button>Powrót</button>
        </Link>
        <p style={{ fontWeight: "700" }}>{this.state.documents[index].title}</p>
        {this.state.documents[index].documentType !== "blood-test" && (
          <p>{this.state.documents[index].content}</p>
        )}
        {this.state.documents[index].documentType === "blood-test" && (
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Lp</th>
                  <th>Parametr</th>
                  <th>Wartość</th>
                  <th>Zakres</th>
                  <th>Jednostka</th>
                </tr>
              </thead>
              {this.state.documents[index].content.map((item, i) => {
                return (
                  <tbody key={i}>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{this.state.documents[index].content[i].name}</td>
                      <td>{this.state.documents[index].content[i].amount}</td>
                      <td>zakres</td>
                      <td>jednostka</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        )}
        <button>Zapisz do PDF</button>
      </div>
    );
  }
}

export default Document;
