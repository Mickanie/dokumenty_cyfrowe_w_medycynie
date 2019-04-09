import React, { Component } from "react";
import { HashRouter, Route, NavLink, Switch, Redirect } from "react-router-dom";
import Document from "./Document";
import MedicalProcess from "./MedicalProcess";
import Documentation from "./Documentation";
import Recommendations from "./Recommendations";
import SideBar from "./SideBar";
import "../css/PatientDoctorPage.css";

class PatientPage extends Component {

  state = {
    patient: {
      id: "12345",
      name: "Jan",
      surname: "Kowalski",
      age: "39",
      PESEL: "80052212345",
      dob: "22-05-1980",
      sex: "M",
      address: "ul. Tuwima 23, 73-123 Warszawa",
      icd10: "G4.2, K13.1",
    }
  }
  render() {
    return (
      <div>
        <SideBar patient={this.state.patient} />

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
            <Route exact path="/documentation" component={Documentation} />
            <Route exact path="/recommendations" component={Recommendations} />
            <Route exact path="/medical-process" component={MedicalProcess} />
            <Route
              exact
              path="/documentation/document:documentId"
              component={Document}
            />

            <Redirect from="/" to="/documentation" />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default PatientPage;
