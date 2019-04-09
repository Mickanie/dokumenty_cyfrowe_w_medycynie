import React, { Component } from "react";
import "../../css/NewDocument.css";
import { Link } from "react-router-dom";

class NewDocument extends Component {
  state = {
    documentType: ""
  };

  chooseDocumentType = e => {
    this.setState({ documentType: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <Link
          to="/documentation"
          className="backButton"
          style={{ position: "absolute", top: "200px", left: "170px" }}
        >
          <button>Powrót</button>
        </Link>
        <div className="new-document">
          <h2 style={{ textAlign: "center" }}>Nowy dokument</h2>
          <label style={{ width: "70%", margin: "auto" }}>
            Typ dokumentu:
            <select
              name="document-type"
              onChange={this.chooseDocumentType}
              defaultValue="default"
            >
              <option value="default" disabled>
                Wybierz typ
              </option>
              <option value="usg">Badanie USG</option>

              <option value="ekg">Badanie EKG</option>
              <option value="echo">Echo serca</option>
              <option value="imaging">Obrazowanie medyczne (TK/MRI)</option>
              <option value="angiography">Angiografia / Koronarografia</option>

      
            </select>
          </label>

          {this.state.documentType && (
            <form className="document-form">
            
              <label>
                {" "}
                Lekarz zlecający: <input type="text" name="ordering-doctor" />
              </label>
              <label>
                {" "}
                Treść: <textarea />
              </label>
       
                <label>
                  {" "}
                  Załączniki: <input type="file" />
                </label>
              
              <input type="submit" value="Dodaj dokument" />
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default NewDocument;
