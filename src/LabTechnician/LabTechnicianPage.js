import React, { Component } from "react";
import "../css/LabTechnicianPage.css";

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
    let amount = document.querySelector("#result").value;

    const newParameter = {
      name,
      amount
    };

    this.setState({ results: [...this.state.results, newParameter] });
    document.querySelector("#result").value = "";
  };

  render() {
    return (
      <div className="container lab-container">
        <h2>Dodaj wynik badania</h2>
        <form className="form">
          <label htmlFor="patient-id">
            ID pacjenta{" "}
            <input id="patient-id" type="text" required pattern="[0-9]{5}" />
          </label>

          <label>
            Typ wyniku
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
                            <td>{this.state.results[i].amount}</td>
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
