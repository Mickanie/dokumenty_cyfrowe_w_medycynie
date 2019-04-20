import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Document.css";

class Document extends Component {
  state = {
    documents: []
  };

  componentDidMount() {
    fetch("https://medical-documentation.herokuapp.com/documentation")
      .then(result => result.json())
      .then(data => this.setState({ documents: data }));
  }

  render() {
    if (this.state.documents.length) {
      // console.log(this.state.documents);
      let currentDocument;
      this.state.documents.forEach(document => {
        console.log(document);
        if (document._id === this.props.match.params.documentId) {
          currentDocument = document;
        }
      });

      console.log(currentDocument);
      return (
        <div className="container document-container">
          <Link
            to="/documentation"
            className="backButton"

          >
            <button>Powrót</button>
          </Link>
          <p style={{ fontWeight: "700" }}>{currentDocument.title}</p>
          {!currentDocument.title.includes("Badanie krwi") && (
            <p>{currentDocument.content}</p>
          )}
          {currentDocument.title.includes("Badanie krwi") && (
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
                {currentDocument.results.map((item, i) => {
                  return (
                    <tbody key={i}>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{currentDocument.results[i].name}</td>
                        <td>{currentDocument.results[i].value}</td>
                        <td>{currentDocument.results[i].range}</td>
                        <td>{currentDocument.results[i].unit}</td>
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
    return null;
  }
}

export default Document;
