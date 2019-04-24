import React, { Component } from "react";
import "../css/LabTechnicianPage.css";
import { today } from "../DateParser";

class LabTechnicianPage extends Component {
  state = {
    resultType: "",
    results: []
  };

  chooseResultType = e => {
    console.log(e.target.value);
    this.setState({ resultType: e.target.value });
  };

  addParameter = e => {
    e.preventDefault();
    let name = document.querySelector("#parameter").value;
    let value = document.querySelector("#result").value;
    //pobrać zakresy i jednostki dla parametru name
    if (value) {
      const newParameter = {
        name,
        value,
        type: this.state.resultType
        //range
        //unit
      };
      this.setState({ results: [...this.state.results, newParameter] });
      document.querySelector("#result").value = "";
    }
  };

  submitResult = e => {
    e.preventDefault();
    const collectionDate = e.target.collectionDate.value.split("T");
    const title = `Badanie krwi ${collectionDate[0]}`;
    const date = today;

    console.log(title, collectionDate.join(" "));
    fetch("https://medical-documentation.herokuapp.com/lab-result", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        labPatientID: e.target.patientID.value,
        title,
        collectionDate: collectionDate.join(" "),
        date,

        results: this.state.results
      })
    });
    this.setState({ resultType: "", results: [] });
    window.location.reload();
  };

  render() {
    return (
      <div className="container lab-container">
        <h2>Dodaj wynik badania krwi</h2>
        <form className="form" onSubmit={this.submitResult}>
          <label htmlFor="patientID">
            ID pacjenta{" "}
            <input name="patientID" type="text" required pattern="[0-9]{5}" />
          </label>
          <label htmlFor="collectionDate">
            Data pobrania <input name="collectionDate" type="datetime-local" />
          </label>

          <label>
            Typ badania
            <select
              name="result-type"
              onChange={this.chooseResultType}
              defaultValue="default"
            >
              <option value="default" disabled={true}>
                Wybierz typ badania
              </option>
              <option value="morfologia">Morfologia krwi</option>
              <option value="biochemia">Biochemia krwi</option>
            </select>
          </label>

          {this.state.resultType && (
            <div>
              <div className="inner-form">
                <label>
                  Wybierz parametr
                  {this.state.resultType === "morfologia" && (
                    <select name="parameter" id="parameter">
                      <option value="HGB">HGB</option>
                      <option value="WGB">WGB</option>
                      <option value="RGB">RGB</option>
                    </select>
                  )}
                  {this.state.resultType === "biochemia" && (
                    <select name="parameter" id="parameter">
                      <option value="LDL">LDL</option>
                      <option value="HDL">HDL</option>
                      <option value="Glukoza">Glukoza</option>
                      <option value="Kwas moczowy">Kwas moczowy</option>
                      <option value="Homocysteina">Homocysteina</option>
                    </select>
                  )}
                </label>
                <label>
                  Wartość
                  <input type="text" name="result" id="result" />
                </label>
                <input
                  type="submit"
                  value="Dodaj parametr"
                  onClick={this.addParameter}
                />
              </div>

              {this.state.results.length > 0 && (
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
                    {this.state.results.map((item, i) => {
                      return (
                        <tbody key={i}>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{this.state.results[i].name}</td>
                            <td>{this.state.results[i].value}</td>
                            <td>zakres</td>
                            <td>jednostka</td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                  <input type="submit" value="Zapisz i prześlij" />
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default LabTechnicianPage;
