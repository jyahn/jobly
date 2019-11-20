import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import "./Navbar.css";


class NavBar extends Component {
  render() {
    return (
      this.props.loggedIn ?
        <nav className="Navbar navbar navbar-expand-md">
          <NavLink className="nav-link navbar-brand brandItem" exact to='/'>jobly</NavLink>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4"><NavLink className="nav-link navItem" exact to='/companies'>Companies</NavLink></li>
            <li className="nav-item mr-4"><NavLink className="nav-link navItem" exact to='/jobs'>Jobs</NavLink></li>
            <li className="nav-item mr-4"><NavLink className="nav-link navItem" exact to='/profile'>Profile</NavLink></li>
            <li className="nav-item mr-4"><NavLink className="nav-link navItem" exact to='/logout'>Logout</NavLink></li>
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