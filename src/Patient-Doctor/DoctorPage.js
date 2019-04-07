import React, { Component } from "react";
import { HashRouter, Route, NavLink, Switch, Redirect } from "react-router-dom";
import Recommendations from "./Recommendations";
import MedicalProcess from "./MedicalProcess";
import Documentation from "./Documentation";

import Document from "./Document";

import SideBar from "./SideBar";
import "../css/PatientDoctorPage.css";
import NewRecommendationForm from "./NewRecommendationForm";

class DoctorPage extends Component {
  state = {
    patientID: ""
  };

  searchPatient = e => {
    e.preventDefault();
    console.log(e.target.patientID.value);
    this.setState({ patientID: e.target.patientID.value });
  };
  render() {
    return (
      <div>
        <form className="ID-form" onSubmit={this.searchPatient}>
          <input type="text" placeholder="Wpisz ID pacjenta" name="patientID" />
          <input type="submit" value="Znajdź pacjenta" />
        </form>

        {this.state.patientID && (
          <div>
            <SideBar activeAccount="doctor" />
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
                  path="/documentation/document:documentId"
                  component={Document}
                />
                <Route
                  exact
                  path="/recommendations/create-new"
                  component={NewRecommendationForm}
                />

                <Route
                  path="/documentation"
                  render={props => (
                    <Documentation {...props} activeAccount="doctor" />
                  )}
                />
                <Route
                  exact
                  path="/recommendations"
                  render={props => (
                    <Recommendations {...props} activeAccount="doctor" />
                  )}
                />
                <Route
                  exact
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
