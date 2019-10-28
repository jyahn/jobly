import React, { Component } from "react";
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="homeContainer">
        <div style={{ textAlign: "center", position: "fixed", top: "50%", left: "50%", marginTop: "-50px", marginLeft: "-100px" }}>
          <h2 className="text-info">Jobly</h2>
          <h6>All the jobs in one, convenient place.</h6>
        </div>
      </div>
    );
  }
}

export default Home;