import React, { Component } from "react";
import JoblyApi from './JoblyApi';
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignUp: false,
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.turnSignUpOff = this.turnSignUpOff.bind(this);
    this.turnSignUpOn = this.turnSignUpOn.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.showSignUp === false) {
      let token = await JoblyApi.login({ username: this.state.username, password: this.state.password })
      console.log(token)
      this.props.changeLoginState()
      localStorage.setItem("_token", token)
      localStorage.setItem("username", this.state.username)
      this.setState({
        showSignUp: false,
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
      });
    }
    else {
      let token = await JoblyApi.register({
        username: this.state.username,
        password: this.state.password,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email
      })
      this.props.changeLoginState()
      localStorage.setItem("_token", token)
      localStorage.setItem("username", this.state.username)
      this.setState({
        showSignUp: false,
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
      });
    }
  }

  turnSignUpOn() {
    this.setState({
      showSignUp: true
    })
  }
  turnSignUpOff() {
    this.setState({
      showSignUp: false
    })
  }


  render() {
    return (
      <div className="Login">
        {!this.props.loggedIn ?
          <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="d-flex justify-content-end">
              <div className="btn-group" >
                <buton className="btn btn-primary" onClick={this.turnSignUpOff}>Login</buton>
                <buton className="btn btn-primary" onClick={this.turnSignUpOn}>Signup</buton>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Username</label>
                    <input className="form-control"
                      type="text"
                      name="username"
                      onChange={this.handleChange}
                      value={this.state.username}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input className="form-control"
                      type="text"
                      name="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                    />
                  </div>
                  {this.state.showSignUp ?
                    <div>
                      <div className="form-group">
                        <label>First Name</label>
                        <input className="form-control"
                          type="text"
                          name="firstName"
                          onChange={this.handleChange}
                          value={this.state.firstName}
                        />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input className="form-control"
                          type="text"
                          name="lastName"
                          onChange={this.handleChange}
                          value={this.state.lastName}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input className="form-control"
                          type="text"
                          name="email"
                          onChange={this.handleChange}
                          value={this.state.email}
                        />
                      </div>
                    </div>
                    : null}
                  <button className="btn btn-primary float-right">Submit</button>
                </form>
              </div>
            </div>
          </div>
          : <Redirect to="/" />}
      </div>
    );
  }
}

export default Login;