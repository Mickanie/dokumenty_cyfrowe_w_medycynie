import React, { Component } from "react";

import "../css/MedicalProcess.css";
import "../css/App.css";

class MedicalProcess extends Component {
  state = {
    tasks: [
      {
        id: 1,
        title: "Kontrola u lekarza prowadzącego",
        completed: false,
        details: "Za 2 tygodnie - w połowie kweitnia 2019 u dr Lubelskiej"
      },
      {
        id: 2,
        title: "Badanie USG",
        completed: false,
        details: "Zaplanowane na 15.04 16:00, Przychodnia XXX pokój 203"
      },
      {
        id: 3,
        title: "Wizyta u kardiologa",
        completed: true,
        details: `13.03.2019, 9:00, opis wizyty (link?), zalecenia (link)`
      }
    ]
  };

  addTask = e => {
    e.preventDefault();
    const completed = e.target.completed.value === "done" ? true : false;

    const newTask = {
      id: this.state.tasks.length+1,
      title: e.target.title.value,
      completed,
      details: e.target.details.value
    };

    this.setState({ tasks: [...this.state.tasks, newTask] });
    e.target.title.value = "";
    e.target.details.value = "";
  };

  setCompleted = e => {
    console.log(e.target.id);
    const index = e.target.id-1;
    this.setState({
      tasks: this.state.tasks.map((task, i) => {
        if (i == index) {
          task.completed = true;
        }
        return task;
      })
    });
  };

  render() {
    return (
      <div className="container medical-process-container">
        {this.props.activeAccount === "doctor" && (
          <form onSubmit={this.addTask}>
            <input type="text" placeholder="Tytuł" name="title" />

            <select name="completed">
              <option value="done">Wykonane</option>
              <option value="todo">Do zrobienia</option>
            </select>
            <textarea placeholder="Szczegóły" name="details" />
            <input type="submit" value="Dodaj" />
          </form>
        )}
        <div className="content">
          <h3>Do zrobienia</h3>
          <ul>
            {this.state.tasks
              .filter(task => task.completed === false)
              .map((task, i) => {
                return (
                  <li key={i}>
                    <strong>{task.title}</strong>
                    {this.props.activeAccount === "doctor" && (
                      <button
                        className="set-done"
                        id={task.id}
                        onClick={this.setCompleted}
                      >
                        ✓
                      </button>
                    )}
                    {this.props.activeAccount === "doctor" && (
                      <button className="set-done" id={i}>
                        🖉
                      </button>
                    )}
                    <br />
                    {task.details}
                  </li>
                );
              })}
          </ul>
          <hr />
          <h3>Wykonane</h3>
          <ul>
            {this.state.tasks
              .filter(task => task.completed === true)
              .map((task, i) => {
                return (
                  <li key={i}>
                    <strong>{task.title}</strong>
                    {this.props.activeAccount === "doctor" && (
                      <button className="set-done" id={i}>
                        🖉
                      </button>
                    )}
                    <br />
                    {task.details}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}

export default MedicalProcess;
