import React, { Component } from "react";
import JoblyApi from './JoblyApi';
import { Redirect } from "react-router-dom";

class Login extends Component {

  async componentDidMount() {
    let token = await JoblyApi.login({ "username": "testuser", "password": "secret" })
    console.log(token);
    this.props.changeLoginState()
    localStorage.setItem("_token", token.token)
  }

  render() {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }
}

export default Login;