import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Navigation from "./Navigation";
import Home from "./Home";
import Memory from "./memory";
import Minesweeper from "./minesweeper";
import Snake from "./snake";

function App() {
  return (
    <Router>
      <Navigation></Navigation>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/memory" component={Memory}></Route>
        <Route path="/minesweeper" component={Minesweeper}></Route>
        <Route path="/snake" component={Snake}></Route>
      </Switch>
    </Router>
  );
}

export default App;
