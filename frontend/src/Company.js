import React, { Component } from "react";
import JoblyApi from "./JoblyApi"
import JobCard from "./JobCard";
import {Redirect} from 'react-router-dom';


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
    console.log("YA", this.state.company.name)
    return (
      <div>
        {this.props.loggedIn ?
        <div>
          <h5>{this.state.company.name}</h5>
          <p>{this.state.company.description}</p>
          <div>
            {this.state.company.jobs.map((job) => (
              <JobCard job={job} />
            ))}
          </div>
        </div>
        : <Redirect to="/login" />}
      </div>
    );
  }
}

export default Company;