import React, { Component } from "react";

import "../css/MedicalProcess.css";
import "../css/App.css";
import { transformFromDB } from '../DateParser'

class MedicalProcess extends Component {
  state = {
    tasks: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/medical-process")
      .then(result => result.json())
      .then(data => this.setState({ tasks: data }));
  }

  addTask = e => {
    e.preventDefault();
    const completed = e.target.completed.value === "done" ? true : false;

    const newTask = {
      id: this.state.tasks.length-1,
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
    const index = e.target.id;
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
    this.state.tasks.forEach((task, i) => {
      task.id = i;
    });
    console.log(this.state.tasks);
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

                    <button className="edit" id={i}>
                      🖉
                    </button>

                    <br />
                    {task.details}
                    <span style={{ float: "right" }}>{transformFromDB(task.date)}</span>
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

                    <button className="edit" id={i}>
                      🖉
                    </button>

                    <br />
                    {task.details}
                    <span style={{ float: "right" }}>{transformFromDB(task.date)}</span>
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
