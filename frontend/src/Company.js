import React, { Component } from "react";
import JoblyApi from "./JoblyApi"
import JobCard from "./JobCard";
import { Redirect } from 'react-router-dom';
import './Company.css'


class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        jobs: []
      }
    }
  }

  async componentDidMount() {
    let company = await JoblyApi.getCompany(this.props.match.params.company)
    this.setState({
      company: company
    })
  }

  render() {
    console.log(this.state.company);
    return (
      <div>
        {this.props.loggedIn ?
          <div>
            <div className="Company-nd">
              <h1 className="Company-name"><strong>{this.state.company.name}</strong></h1>
              <h6>{this.state.company.description}</h6>
            </div>
            <div className="row">
              {this.state.company.jobs.sort((a, b) => a.salary - b.salary).map((job) => (
                <div className="Jobs-item col-lg-4 col-md-6 mt-3 px-5 text-center">
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          </div>
          : <Redirect to="/login" />}
      </div>
    );
  }
}

export default Company;