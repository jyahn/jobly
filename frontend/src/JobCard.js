import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./CardList.css"

class JobCard extends Component {
  render() {
    return (
      <div className="Card card">
        <div className="card-body">
          <h6 className="card-title d-flex justify-content-between">
            <span class="text-capitalize">{this.props.job.title}</span>
          </h6>
          <div>Salary: {this.props.job.salary}</div>
          <div>Equity: {this.props.job.equity}</div>
          <button>Applied</button>
        </div>
      </div>
    );
  }
}

export default JobCard;