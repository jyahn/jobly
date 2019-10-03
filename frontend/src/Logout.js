import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  async componentDidMount() {
    this.props.changeLoginState()
    localStorage.removeItem("_token")
    localStorage.removeItem("username")
  }
  render() {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }
}

export default Logout;