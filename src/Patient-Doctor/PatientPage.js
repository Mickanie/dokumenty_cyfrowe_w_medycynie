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
    patientID: "",
    tasks: []
  };

  componentDidMount() {
    fetch("https://medical-documentation.herokuapp.com/medical-process")
      .then(result => result.json())
      .then(data => this.setState({ tasks: data }));
  }

  render() {
    return (
      <div>
        <SideBar tasks={this.state.tasks} />

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
            <Route
              path="/medical-process"
              render={props => (
                <MedicalProcess {...props} tasks={this.state.tasks} />
              )}
            />
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
