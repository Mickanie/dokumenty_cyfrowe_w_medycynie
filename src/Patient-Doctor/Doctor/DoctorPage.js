import React, { Component } from "react";
import { HashRouter, Route, NavLink, Switch, Redirect } from "react-router-dom";
import Recommendations from "../Recommendations";
import MedicalProcess from "../MedicalProcess";
import Documentation from "../Documentation";
import NewDocument from "./NewDocument";
import Document from "../Document";

import SideBar from "../SideBar";
import "../../css/PatientDoctorPage.css";
import NewRecommendation from "./NewRecommendation";
import NewAttachment from "./NewAttachemnt";

class DoctorPage extends Component {
  state = {
    patientID: "",
    patient: {
      id: "12345",
      name: "Jan",
      surname: "Kowalski",
      age: "39",
      PESEL: "80052212345",
      dob: "22-05-1980",
      sex: "M",
      address: "ul. Tuwima 23, 73-123 Warszawa",
      icd10: "G4.2, K13.1"
    }
  };

  searchPatient = e => {
    e.preventDefault();
    /* e.target.patientID.setCustomValidity(
      "Wprowadź poprawne 5-cyfrowe ID pacjenta"
    ); */
    
    this.setState({ patientID: e.target.patientID.value });
  };
  render() {
    return (
      <div>
        <form className="ID-form" onSubmit={this.searchPatient}>
          <input
            type="text"
            placeholder="Wpisz ID pacjenta"
            name="patientID"
            pattern="[0-9]{5}"
          />
          <input type="submit" value="Znajdź pacjenta" />
        </form>

        {this.state.patientID && (
          <div>
            <SideBar activeAccount="doctor" patient={this.state.patient} />
            <HashRouter>
              <nav>
                <NavLink to="/documentation" activeClassName="active">
                  Dokumentacja
                </NavLink>
                <NavLink to="/recommendations" activeClassName="active">
                  Zalecenia lekarskie
                </NavLink>
                <NavLink to="/medical-process" activeClassName="active">
                  Proces medyczny
                </NavLink>
              </nav>
              <Switch>
                <Route
                  exact
                  path="/recommendations/create-new/generate-prescription"
                  render={props => (
                    <NewAttachment {...props} documentType="prescription" />
                  )}
                />

                <Route
                  exact
                  path="/recommendations/create-new/generate-sickleave"
                  render={props => (
                    <NewAttachment {...props} documentType="sickleave" />
                  )}
                />

                <Route
                  exact
                  path="/recommendations/create-new/generate-referral"
                  render={props => (
                    <NewAttachment {...props} documentType="referral" />
                  )}
                />

                <Route
                  exact
                  path="/recommendations/create-new/generate-lab-order"
                  render={props => (
                    <NewAttachment {...props} documentType="lab-order" />
                  )}
                />
                <Route
                  exact
                  path="/documentation/document:documentId"
                  component={Document}
                />
                <Route
                  exact
                  path="/recommendations/create-new"
                  component={NewRecommendation}
                />

                <Route
                  exact
                  path="/documentation/create-new"
                  component={NewDocument}
                />

                <Route
                  path="/documentation"
                  render={props => (
                    <Documentation {...props} activeAccount="doctor" />
                  )}
                />
                <Route
                  path="/recommendations"
                  render={props => (
                    <Recommendations {...props} activeAccount="doctor" />
                  )}
                />
                <Route
                  path="/medical-process"
                  render={props => (
                    <MedicalProcess {...props} activeAccount="doctor" />
                  )}
                />

                <Redirect from="/" to="/documentation" />
              </Switch>
            </HashRouter>
            <div />
          </div>
        )}
      </div>
    );
  }
}

export default DoctorPage;
