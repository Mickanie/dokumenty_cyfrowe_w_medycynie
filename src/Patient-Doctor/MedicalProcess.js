import React, { Component } from "react";

import "../css/MedicalProcess.css";
import "../css/App.css";
import { transformFromDB } from "../DateParser";

class MedicalProcess extends Component {
  state = {
    tasks: []
  };
  
  render() {
  
    return (
      <div className="container medical-process-container">
        {this.props.activeAccount === "doctor" && (
          <form onSubmit={this.props.addTask}>
            <input type="text" placeholder="Tytuł" name="title" />
            <select name="completed">
              <option value="done">Wykonane</option>
              <option value="todo">Do zrobienia</option>
            </select>
            Data: <input type="datetime-local" name="date" />
            <textarea placeholder="Szczegóły" name="details" />
            <input type="submit" value="Dodaj zadanie" />
          </form>
        )}
        <div className="content">
          <h3>Do zrobienia</h3>
          <ul>
            {this.props.tasks
              .filter(task => task.completed === false)
              .map((task, i) => {
                return (
                  <li key={i}>
                    <strong>{task.title}</strong>
                    {this.props.activeAccount === "doctor" && (
                      <button
                        className="set-done"
                        id={task._id}
                        onClick={this.props.setCompleted}
                      >
                        ✓
                      </button>
                    )}

                    <button className="edit" id={i}>
                      🖉
                    </button>

                    <br />
                    {task.details}
                    <span style={{ float: "right" }}>{task.date}</span>
                  </li>
                );
              })}
          </ul>
          <hr />
          <h3>Wykonane</h3>
          <ul>
            {this.props.tasks
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
                    <span style={{ float: "right" }}>{task.date}</span>
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
