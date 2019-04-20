import React, { Component } from "react";
import "../css/SideBar.css";

class SideBar extends Component {
  state = {
    patient: [],
    tasks: []
  };

  componentDidMount() {
    fetch("https://medical-documentation.herokuapp.com/patient")
      .then(result => result.json())
      .then(data => this.setState({ patient: data }));

 
  }

  render() {
    const patient = this.state.patient;
    return (
      <div className="side-bar">
        <div className="patient-info">
          <h3>Dane osobowe</h3>

          <table>
            <tbody>
              <tr>
                <td>Imię i nazwisko: </td>
                <td>
                  {" "}
                  {patient.name} {patient.surname}{" "}
                </td>
              </tr>
              <tr>
                <td>Płeć: </td>
                <td> {patient.sex} </td>
              </tr>
              <tr>
                <td>Wiek: </td>
                <td> {patient.age} </td>
              </tr>
              <tr>
                <td>PESEL: </td>
                <td> {patient.PESEL} </td>
              </tr>
              <tr>
                <td>Data urodzenia: </td>
                <td> {patient.dateOfBirth} </td>
              </tr>
              <tr>
                <td>Adres: </td>
                <td> {patient.address} </td>
              </tr>
              <tr>
                <td>Telefon: </td>
                <td> {patient.telephone} </td>
              </tr>
              <tr>
                <td>ICD10: </td>
                <td> {patient.icd10} </td>
              </tr>
            </tbody>
          </table>

          {this.props.activeAccount === "doctor" && <button>Edytuj</button>}
        </div>
        <div className="todo-list">
          <h3>Zadania do wykonania</h3>
          <ul>
            {this.props.tasks.map((task, i) => {
              return (
                <li key={i}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={this.props.toggleComplete}
                    id={task._id}
                    disabled={this.props.activeAccount !== "doctor"}
                  />{" "}
                  {task.title}
                </li>
              );
            })}
          </ul>
          {this.props.activeAccount === "doctor" && (
            <form onSubmit={this.props.addTask}>
              <input
                type="text"
                placeholder="Wpisz nowe zadanie"
                name="title"
              />
              <input type="submit" value="Dodaj" />
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default SideBar;
