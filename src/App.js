import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import Register from "./Register";

import Main from "./Main";

import "./css/App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Main} />
        </Switch>
      </div>
    );
  }
}

export default App;
