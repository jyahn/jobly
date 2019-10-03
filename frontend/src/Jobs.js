import React, { Component } from "react";
import JobCard from './JobCard';
import JoblyApi from './JoblyApi';
import { Redirect } from 'react-router-dom';


class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    }
  }

  async componentDidMount() {
    let jobs = await JoblyApi.getJobs()
    console.log(jobs);
    this.setState({
      jobs: jobs
    })
  }
  render() {
    console.log(this.state)
    return (
      <div className="col-md-10 offset-md-1">
        {this.props.loggedIn ?
          <div className="CardList">
            {this.state.jobs.map((job) => (
              <JobCard job={job} />
            ))}
          </div>
          : <Redirect to="/login" />}
      </div>
    );
  }
}

export default Jobs;