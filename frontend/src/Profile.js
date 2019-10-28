import React, { Component } from "react";



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.currentUser.first_name,
      lastName: this.props.currentUser.last_name,
      email: this.props.currentUser.email,
      photoUrl: this.props.currentUser.photo_url,
      password: ""
    }
  }
  render() {
    return (
      <div className="col-md-6 offset-md-3 offset" style = {{opacity: "0.5"}}>
        <h3 className="text-info" style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>User Profile</h3>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Username</label>
                <p className="form-control-plaintext">rithmtest123</p>
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input className="form-control"
                  name="first_name"
                  value={this.state.firstName}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input className="form-control"
                  name="last_name"
                  value={this.state.lastName}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input className="form-control"
                  name="email"
                  value={this.state.email}
                />
              </div>
              <div className="form-group">
                <label>Photo URL</label>
                <input className="form-control"
                  name="photo_url"
                  value={this.state.photoUrl}
                />
              </div>
              <div className="form-group">
                <label>Update password (leave empty to keep current)</label>
                <input className="form-control"
                  name="password"
                  value={this.state.password}
                />
              </div>
              <button className="btn btn-info btn-block mt-4">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;