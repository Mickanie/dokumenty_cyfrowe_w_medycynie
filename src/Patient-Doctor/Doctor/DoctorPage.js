import React, { Component } from "react";
import { HashRouter, Route, NavLink, Switch, Redirect } from "react-router-dom";
import Recommendations from "../Recommendations";
import MedicalProcess from "../MedicalProcess";
import Documentation from "../Documentation";
import NewDocument from "./NewDocument";
import Document from "../Document";
import Report from "../Report";
import SideBar from "../SideBar";
import "../../css/PatientDoctorPage.css";
import NewRecommendation from "./NewRecommendation";
import NewAttachment from "./NewAttachment";

class DoctorPage extends Component {
  state = {
    patientID: "",
    tasks: [],
    patients: []
  };

  async componentDidMount() {
    await fetch("https://medical-documentation.herokuapp.com/medical-process")
      .then(result => result.json())
      .then(data => this.setState({ tasks: data.sort(this.compare) }));
    await fetch("https://medical-documentation.herokuapp.com/patients")
      .then(result => result.json())
      .then(data => {
        console.log(data);
        this.setState({ patients: data.map(patient => patient.id) });
      });
  }
  //MEDICAL PROCESS
  addTask = async e => {
    e.preventDefault();
    e.persist();
    e.target.title.value = e.target.title.value.trim();

    if (e.target.title.value.length === 0) {
      return;
    }
    const completed = e.target.completed.value === "done" ? true : false;

    await fetch("https://medical-documentation.herokuapp.com/new-task", {
      method: "post",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: e.target.title.value,
        date: e.target.date.value.split("T").join(" "),
        completed,
        details: e.target.details.value,
        previousTask: e.target.previousTask.value
      })
    })
      .then(response => response.json())
      .then(data => this.setState({ tasks: data.sort(this.compare) }));

    e.target.title.value = "";
    e.target.details.value = "";
    e.target.date.value = "";
  };

  //SIDE BAR
  addTaskFromSideBar = async e => {
    e.preventDefault();
    console.log(e.target);
    e.persist();
    e.target.title.value = e.target.title.value.trim();

    if (e.target.title.value.length === 0) {
      return;
    }
    await fetch("https://medical-documentation.herokuapp.com/new-task", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: e.target.title.value,
        date: "",
        completed: false,
        details: "",
        previousTask: ""
      })
    })
      .then(response => response.json())
      .then(data => this.setState({ tasks: data.sort(this.compare) }));

    e.target.title.value = "";
  };

  editTask = async id => {
    await fetch("https://medical-documentation.herokuapp.com/edit-task", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: document.querySelector("#title").value,
        details: document.querySelector("#details").value,
        date: document.querySelector("#date").value,
        previousTaskId: document.querySelector("#previous-task").value,
        id: id
      })
    })
      .then(result => result.json())
      .then(data => this.setState({ tasks: data.sort(this.compare) }));
  };

  setCompleted = e => {
    const id = e.target.id;
    this.setState({
      tasks: this.state.tasks.map((task, i) => {
        if (task._id === id) {
          task.completed = true;
        }
        return task;
      })
    });

    fetch("https://medical-documentation.herokuapp.com/complete-task", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, completed: true })
    });
  };

  toggleComplete = async e => {
    const id = e.target.id;
    let isCompleted = "";
    this.setState({
      tasks: this.state.tasks.map((task, i) => {
        if (task._id === id) {
          task.completed = !task.completed;
          isCompleted = task.completed;
        }
        return task;
      })
    });
    //dodanie do bazy
    await fetch("https://medical-documentation.herokuapp.com/complete-task", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, completed: isCompleted })
    });
  };

  searchPatient = async e => {
    e.preventDefault();

    //console.log(e.target.patientID.value);
    let patientID;
    if (!this.state.patientID) {
      e.preventDefault();
      patientID = e.target.patientID.value;

      await fetch(
        "https://medical-documentation.herokuapp.com/get-patient-data",
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patientID })
        }
      ).then(result => {
        if (result.status === 400) {
          alert("Nie ma takiego pacjenta");
        } else {
          this.setState({ patientID });
        }
      });

      await fetch("https://medical-documentation.herokuapp.com/medical-process")
        .then(result => result.json())
        .then(data => {
          this.setState({ tasks: data.sort(this.compare) });
        });
    } else {
      this.setState({ patientID: "" });

      fetch("https://medical-documentation.herokuapp.com/get-patient-data", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientID: "" })
      });
      //e.target.patientID.required = true;
    }
  };

  compare = (a, b) => {
    const dateA =
      parseInt(
        a.date
          .split(" ")[0]
          .split("-")
          .join("")
      ) || 0;
    const dateB =
      parseInt(
        b.date
          .split(" ")[0]
          .split("-")
          .join("")
      ) || 0;

    return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
  };

  render() {
    let patientID = this.state.patientID;
    return (
      <div>
        <form className="ID-form" onSubmit={this.searchPatient}>
          {patientID ? (
            <p className="id-info">{patientID}</p>
          ) : (
            <select name="patientID" defaultValue="">
              <option value="" disabled>
                Wybierz pacjenta
              </option>
              {this.state.patients.map((patient, i) => {
                return (
                  <option key={i} value={patient}>
                    {patient}
                  </option>
                );
              })}
            </select>
          )}

          <input
            type="submit"
            value={this.state.patientID ? "Zmień pacienta" : "Znajdź pacjenta"}
          />
        </form>

        {this.state.patientID && (
          <div>
            <SideBar
              activeAccount="doctor"
              patient={this.state.patientID}
              tasks={this.state.tasks}
              addTask={this.addTaskFromSideBar}
              toggleComplete={this.toggleComplete}
            />
            <HashRouter>
              <nav>
                <NavLink to="/documentation" activeClassName="active">
                  Dokumentacja
                </NavLink>
                <NavLink to="/recommendations" activeClassName="active">
                  Zalecenia
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
                <Route exact path="/documentation/report" component={Report} />}
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
                    <MedicalProcess
                      {...props}
                      activeAccount="doctor"
                      tasks={this.state.tasks}
                      addTask={this.addTask}
                      setCompleted={this.setCompleted}
                      editTask={this.editTask}
                    />
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
