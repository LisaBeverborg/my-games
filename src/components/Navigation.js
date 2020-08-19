import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./Navigation.css";

//import { AiFillHome } from "react-icons/ai";
//import { GrApps } from "react-icons/gr";
//import { GiMineExplosion } from "react-icons/gi";
//import { GiSandSnake } from "react-icons/gi";

function Navigation() {
  return (
    <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
      <Link to="/" className="navbar-brand">
        Games
      </Link>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/memory" className="nav-link">
            Memory
          </Link>
          <Link to="/minesweeper" className="nav-link">
            Minesweeper
          </Link>
          <Link to="/snake">
            <span className="snake-icon"></span>
            <p className="snake">Snake</p>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
