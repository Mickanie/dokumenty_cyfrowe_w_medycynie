import React, { Component } from "react";
/* import { withRouter } from 'react-router-dom'; */
//import { history } from 'react-router-dom';

class Register extends Component {
  state = {
    accountType: "patient"
  };

  chooseAccountType = e => {
    this.setState({ accountType: e.target.value });
  };

  goBack = () => {
    this.props.history.push("/");
  };

  validatePassword = () => {
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirm-password");

    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Hasła nie są jednakowe");
    } else {
      confirmPassword.setCustomValidity("");
    }
  };
  render() {
    return (
      <div className="container register-container">
        <h2>Zarejestruj się</h2>
        <button
          style={{ position: "absolute", top: "5%", left: "350px" }}
          onClick={this.goBack}
        >
          Powrót do logowania
        </button>
        <form>
          <span>
            <label>Typ konta: </label>
            <select name="accoutType" onChange={this.chooseAccountType}>
              <option value="patient">Pacjent</option>
              <option value="doctor">Lekarz</option>
              <option value="lab">Laborant</option>
            </select>
          </span>
          <span>
            <label htmlFor="name">Imię </label>
            <input type="text" name="name" required />
          </span>
          <span>
            <label htmlFor="surname">Nazwisko </label>
            <input type="text" name="surname" required />
          </span>
          {this.state.accountType !== "doctor" && (
            <span>
              <label htmlFor="dob">Data urodzenia </label>
              <input type="date" name="dob" required />
            </span>
          )}
          <span>
            <label htmlFor="pesel">PESEL </label>
            <input
              type="text"
              name="pesel"
              id="pesel"
              required
              pattern="[0-9]{11}"
            />
          </span>
          {this.state.accountType === "doctor" && (
            <>
              {" "}
              <span>
                <label>Numer PWZ</label>
                <input type="text" name="PWZ" required />
              </span>
              <span>
                <label>Specjalizacja</label>
                <input type="text" name="specialization" required />
              </span>
            </>
          )}
          <span>
            <label htmlFor="password">Hasło </label>
            <input
              type="password"
              required
              id="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
            />
          </span>
          <span>
            <label htmlFor="password">Powtórz hasło </label>
            <input
              type="password"
              required
              id="confirm-password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
              onChange={this.validatePassword}
            />
          </span>

          {this.state.accountType === "patient" && (
            <p>Wygenerowany dla Ciebie login to: P12345 </p>
          )}
          {this.state.accountType === "doctor" && (
            <p>Wygenerowany dla Ciebie login to: D12321 </p>
          )}
          {this.state.accountType === "lab" && (
            <p>Wygenerowany dla Ciebie login to: L10010 </p>
          )}

          <input type="submit" value="Zarejestruj się" />
        </form>
      </div>
    );
  }
}

export default Register;
