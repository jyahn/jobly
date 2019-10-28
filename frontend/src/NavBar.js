import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import './Navbar.css'


class NavBar extends Component {
  render() {
    console.log("props in nav", this.props)
    return (
      this.props.loggedIn ?
        <nav className="navbar navbar-expand-md bg-info" style={{ borderBottom: "3px solid #de835b" }}>
          <NavLink className="nav-link navbar-brand navItem" style={{ color: "white" }} exact to='/'>Jobly</NavLink>
          <ul className="navbar navbar-nav ml-auto bg-info">
            <li className="nav-item mr-4"><NavLink className="nav-link navItem" style={{ color: "white" }} exact to='/companies'>Companies</NavLink></li>
            <li className="nav-item mr-4"><NavLink className="nav-link navItem" style={{ color: "white" }} exact to='/jobs'>Jobs</NavLink></li>
            <li className="nav-item mr-4"><NavLink className="nav-link navItem" style={{ color: "white" }} exact to='/profile'>Profile</NavLink></li>
            <li className="nav-item mr-4"><NavLink className="nav-link navItem" style={{ color: "white" }} exact to='/logout'>Logout</NavLink></li>
          </ul>
        </nav >
        :
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="nav-link" exact to='/login'>Login</NavLink>
        </nav >

    );
  }
}

export default NavBar;