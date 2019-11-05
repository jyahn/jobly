import React, { Component } from "react";
import './Profile.css'
import JoblyApi from "./JoblyApi";
import { Button } from 'reactstrap';


class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // first_name: '',
      // last_name: '',
      // email: '',
      // photo_url: '',
      // password: '',
      // loading: true,
      // error: []
      first_name: this.props.currentUser.first_name,
      last_name: this.props.currentUser.last_name,
      email: this.props.currentUser.email,
      photo_url: this.props.currentUser.photo_url,
      password: this.props.currentUser.password,
      error: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // async componentDidMount() {
  //   try {
  //     let token = localStorage.getItem('_token');
  //     let user = await JoblyApi.getUser(localStorage.getItem("username"))
  //     console.log("user is ", user)
  //     this.setState(st => ({ ...st, ...user, loading: false }));
  //   } catch (err) {
  //     this.setState(st => ({
  //       error: Array.isArray(err)
  //         ? [...st.error, ...err]
  //         : [...st.error, err.message]
  //     }));
  //   }
  // }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }


  async handleSubmit(evt) {
    evt.preventDefault()
    // let { loading, password, ...userData } = this.state
    let { loading, password, first_name, last_name, email, photo_url } = this.state
    let userData = { first_name, last_name, email }
    console.log("userdata in prof", userData);
    let updatedProfile = await JoblyApi.editUser(this.props.currentUser.username, userData);
  }


  render() {
    console.log("props in profile", this.props)
    console.log("state in profile", this.state)
    if (this.state.loading) {
      return 'Loading Profile...'
    }
    return (
      <div className="Profile-container col-lg-4 col-md-6 offset-4" style={{ opacity: "0." }}>
        <div className="Profile card">
          <div className="card-body">
            <h3 className="Profile-header">User Profile</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <p className="form-control-plaintext">{this.props.currentUser.username}</p>
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input className="form-control"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input className="form-control"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Photo URL</label>
                <input className="form-control"
                  name="photo_url"
                  value={this.state.photo_url}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Update password (leave empty to keep current)</label>
                <input className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="Profile-btn text-center">
                <Button className="Profile-button btn m-*-auto btn-md mt-4">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;