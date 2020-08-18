import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { FaGithub } from "react-icons/fa";

import Navigation from "./Navigation";
import Home from "./Home";
import Memory from "./memory";
import Minesweeper from "./minesweeper";
import Snake from "./snake";

function App() {
  return (
    <Router>
      <header className="App-header">
        <h1>Nostalgic Games</h1>
        <h3>Here you can play all the classics! </h3>
        <p>Memory, Minesweeper and Snake</p>
      </header>
      <Navigation></Navigation>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/memory" component={Memory}></Route>
        <Route path="/minesweeper" component={Minesweeper}></Route>
        <Route path="/snake" component={Snake}></Route>
      </Switch>
      <footer className="App-footer">
        <a href="https://github.com/iths-lisa-beverborg/my-games">
          <FaGithub className="github-repo-link" />
        </a>
        <h2>Made by Lisa</h2>
      </footer>
    </Router>
  );
}

export default App;
