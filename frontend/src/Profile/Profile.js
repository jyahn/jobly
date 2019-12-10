import React, { Component } from "react";
import './Profile.css'
import JoblyApi from "../JoblyApi";
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import { Button, Label, Input } from 'reactstrap';


class Profile extends Component {
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
    let updatedProfile = await JoblyApi.editUser(this.props.currentUser.username, userData);
  }


  render() {
    if (this.state.loading) {
      return 'Loading Profile...'
    }
    if (!this.props.currUser) {
      return <ErrorHandler error={['Oops! You must be logged in to view this page.']} />;
    }
    return (
      <div className="Profile-container col-lg-4 col-md-6 offset-4" style={{ opacity: "0." }}>
        <div className="Profile card">
          <div className="card-body">
            <div className="Profile-header text-center"> Username
              <div className="Profile-username">{this.props.currentUser.username}</div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <Label>First Name</Label>
                <Input className="form-control"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Label>Last Name</Label>
                <Input className="form-control"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Label>Email</Label>
                <Input className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Label>Photo URL</Label>
                <Input className="form-control"
                  name="photo_url"
                  value={this.state.photo_url}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Label>Update password (leave empty to keep current)</Label>
                <Input className="form-control"
                  name="password"
                  type="password"
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