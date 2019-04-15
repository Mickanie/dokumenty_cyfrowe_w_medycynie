import React, { Component } from "react";
import "../css/SideBar.css";

class SideBar extends Component {
  state = {
    patient: [],
    tasks: [
      /*     {
        title: "Kontrola u lekarza prowadzącego",
        completed: false,
        details: "Za 2 tygodnie - w połowie kwietnia 2019 u dr Lubelskiej"
      },
      {
        title: "Badanie USG",
        completed: false,
        details: "Zaplanowane na 15.04 16:00, Przychodnia XXX pokój 203"
      },
      {
        title: "Wizyta u kardiologa",
        completed: true,
        details: `13.03.2019, 9:00, opis wizyty (link?), zalecenia (link)`
      } */
    ]
  };

  componentDidMount() {
    fetch("http://localhost:3000/patient")
      .then(result => result.json())
      .then(data => this.setState({ patient: data }));

    fetch("http://localhost:3000/medical-process")
      .then(result => result.json())
      .then(data => this.setState({ tasks: data }));
  }

  addTask = e => {
    e.preventDefault();
    console.log(e.target.content.value);
    const newTask = {
      title: e.target.content.value,
      completed: false,
      details: ""

      //add to db
    };

    this.setState({ tasks: [...this.state.tasks, newTask] });
    e.target.content.value = "";
  };

  toggleComplete = e => {
    const index = e.target.id;

    this.setState({
      tasks: this.state.tasks.map((task, i) => {
        if (i == index) {
          task.completed = !task.completed;
        }
        return task;

        //add to db
      })
    });
  };
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
                  {patient.Imie} {patient.Nazwisko}{" "}
                </td>
              </tr>
              <tr>
                <td>Płeć: </td>
                <td> {patient.Plec} </td>
              </tr>
              <tr>
                <td>PESEL: </td>
                <td> {patient.PESEL} </td>
              </tr>
              <tr>
                <td>Data urodzenia: </td>
                <td> {patient.DataUrodzenia} </td>
              </tr>
              <tr>
                <td>Adres: </td>
                <td> {patient.AdresZamieszkania} </td>
              </tr>
              <tr>
                <td>Telefon: </td>
                <td> {patient.TelefonKontaktowy} </td>
              </tr>
              <tr>
                <td>ICD10: </td>
                <td> {patient.JednostkiChorobowe} </td>
              </tr>
            </tbody>
          </table>

          {this.props.activeAccount === "doctor" && <button>Edytuj</button>}
        </div>
        <div className="todo-list">
          <h3>Zadania do wykonania</h3>
          <ul>
            {this.state.tasks.map((task, i) => {
              return (
                <li key={i}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={this.toggleComplete}
                    id={i}
                    disabled={this.props.activeAccount !== "doctor"}
                  />{" "}
                  {task.title}
                </li>
              );
            })}
          </ul>
          {this.props.activeAccount === "doctor" && (
            <form onSubmit={this.addTask}>
              <input
                type="text"
                placeholder="Wpisz nowe zadanie"
                name="content"
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
