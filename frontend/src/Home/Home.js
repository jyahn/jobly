import React, { Component } from "react";
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div>
        <div className="homeContainer">
          <h2 id="home-title">jobly</h2>
          <h6 id = "home-slogan">All the jobs in one, convenient place.</h6>
        </div>
      </div>
    );
  }
}

export default Home;