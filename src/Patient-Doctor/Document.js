import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Document.css";

class Document extends Component {
  state = {
    documents: [],
	patients: []
  };

  async componentDidMount() {
    await fetch("https://medical-documentation.herokuapp.com/documentation")
      .then(result => result.json())
      .then(data => this.setState({ documents: data }));
	await fetch("https://medical-documentation.herokuapp.com/patient")
      .then(result => result.json())
      .then(data => this.setState({ patients: data }));
  }

  render() {
    if (this.state.documents.length && this.state.patients) {
      // console.log(this.state.documents);
      let currentDocument;
      this.state.documents.forEach(document => {
        console.log(document);
        if (document._id === this.props.match.params.documentId) {
          currentDocument = document;
        }
      });
	  
	  let currentPatient;
	  currentPatient = this.state.patients;
      /*this.state.patients.forEach(document => {
		  alert(document.patientID + " " + currentDocument.patientID);
        if (document.patientID === currentDocument.patientID) {
          currentPatient = document;
        }
      });*/

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
          <button onClick={() => this.handleClick(currentDocument, currentPatient)}>Zapisz do PDF</button>
        </div>
      );
    }
    return null;
  }
  
  handleClick(currentDocument, currentPatient) {
	const FileSaver = require('file-saver');
	const filePatient = new File([JSON.stringify(currentPatient)], 'patient.json', {type: "text/plain;charset=utf-8"});
	FileSaver.saveAs(filePatient);
	const fileResults = new File([JSON.stringify(currentDocument)], 'results.json', {type: "text/plain;charset=utf-8"});
	FileSaver.saveAs(fileResults);
  }
}

export default Document;
