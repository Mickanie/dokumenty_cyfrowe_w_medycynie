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

  }
  render() {
    return (
      <div>
        <SideBar />

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
