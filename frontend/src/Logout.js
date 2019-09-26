import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  async componentDidMount() {
    this.props.changeLoginState()
    localStorage.removeItem("_token")
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