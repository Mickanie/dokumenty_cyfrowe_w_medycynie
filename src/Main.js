import React, { Component } from "react";
import { Link } from "react-router-dom";
import PatientPage from "./Patient-Doctor/PatientPage";
import DoctorPage from "./Patient-Doctor/Doctor/DoctorPage";
import LabTechnicianPage from "./LabTechnician/LabTechnicianPage";

class Main extends Component {
  state = {
    activeAccount: localStorage.getItem("account") || "",
    isLoggedIn: false
  };

  componentDidUpdate() {
    //because setState is asynchronous
    localStorage.setItem("loggedIn", this.state.isLoggedIn);
    localStorage.setItem("account", this.state.activeAccount);
  }

  changeAccount = e => {
    this.setState({ activeAccount: e.target.value });
  };

  logIn = e => {
    e.preventDefault();
    console.log(e.target.login.value);
    let activeAccount = "";
    switch (e.target.login.value[0]) {
      case "P":
        activeAccount = "patient";
        break;
      case "D":
        activeAccount = "doctor";
        break;
      case "L":
        activeAccount = "lab";
        break;
      default:
        activeAccount = "";
    }
    this.setState({ activeAccount, isLoggedIn: true });
  };

  logOut = () => {
    this.setState({ activeAccount: "", isLoggedIn: false });
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        {!this.state.isLoggedIn ? (
          <div className="container login-container">
            <h2>Zaloguj się</h2>
            <form onSubmit={this.logIn}>
              <label htmlFor="login">Użytkownik: </label>
              <input type="text" name="login" pattern="[PDL]\d{5}" required />
              <label htmlFor="password">Hasło: </label>
              <input type="password" name="password" required />
              <input type="submit" value="Zaloguj" />
            </form>
            <p>Nie masz konta?</p>
            <Link to="/register">
              <button>Zarejestruj się</button>
            </Link>
          </div>
        ) : (
          <div className="header">
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="account"
                  id="Patient"
                  value="patient"
                  checked={this.state.activeAccount === "patient"}
                  onChange={this.changeAccount}
                />{" "}
                Pacjent
              </label>
              <label>
                <input
                  type="radio"
                  name="account"
                  id="Doctor"
                  value="doctor"
                  checked={this.state.activeAccount === "doctor"}
                  onChange={this.changeAccount}
                />{" "}
                Lekarz
              </label>
              <label>
                <input
                  type="radio"
                  name="account"
                  id="Lab"
                  value="lab"
                  checked={this.state.activeAccount === "lab"}
                  onChange={this.changeAccount}
                />{" "}
                Laborant
              </label>
            </div>

            <button className="log-out" onClick={this.logOut}>
              Wyloguj się
            </button>

            {this.state.activeAccount === "patient" ? (
              <PatientPage />
            ) : this.state.activeAccount === "doctor" ? (
              <DoctorPage />
            ) : (
              <LabTechnicianPage />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Main;
