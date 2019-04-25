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
      
      let currentDocument;
      this.state.documents.forEach(document => {
        
        if (document._id === this.props.match.params.documentId) {
          currentDocument = document;
        }
      });

      console.log(currentDocument);
      return (
        <div className="container document-container">
          <Link to="/documentation" className="backButton">
            <button>Powrót</button>
          </Link>
          <p style={{ fontWeight: "700" }}>{currentDocument.title}</p>
          {!currentDocument.title.includes("Badanie krwi") && (
            <div style={{ textAlign: "left", width: "30%", margin: "0 auto" }}>
              <p>Data: {currentDocument.date}</p>
              <p>Lekarz zlecający: {currentDocument.orderingDoctor}</p>
              <p>Lekarz wykonujący: {currentDocument.performingDoctor}</p>
              <p>Lekarz opisujący: {currentDocument.describingDoctor}</p>
              <p>
                <br />
                {currentDocument.content}
              </p>
            </div>
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
          <button onClick={() => this.saveToPDF(parametr)}>Zapisz do PDF</button>
        </div>
      );
    }
    return null;
  }
}

export default Document;
