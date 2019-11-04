import React, { Component } from "react";
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div>
        <div className="homeContainer">
          <h2 className="text">jobly</h2>
          <h6>All the jobs in one, convenient place.</h6>
        </div>
      </div>
    );
  }
}

export default Home;