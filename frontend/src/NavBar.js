import React, { Component } from "react";
import { NavLink } from 'react-router-dom';


class NavBar extends Component {
  render() {
    console.log("props in nav", this.props)
    return (
      this.props.loggedIn ?
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="nav-link" exact to='/'>Jobly</NavLink>
          <NavLink className="nav-link" exact to='/companies'>Companies</NavLink>
          <NavLink className="nav-link" exact to='/jobs'>Jobs</NavLink>
          <NavLink className="nav-link" exact to='/profile'>Profile</NavLink>
          <NavLink className="nav-link" exact to='/logout'>Logout</NavLink>
        </nav>
        :
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="nav-link" exact to='/login'>Login</NavLink>
        </nav >

    );
  }
}

export default NavBar;