import React, { Component } from "react";
import JoblyApi from "../JoblyApi"
import JobCard from "../JobCard/JobCard";
import { Redirect } from 'react-router-dom';
import './Company.css'

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
      jobs: [],
      error: []
    }
    this.handleApplyButton = this.handleApplyButton.bind(this);
  }

  async componentDidMount() {
    let company = await JoblyApi.getCompany(this.props.match.params.company)
    let jobs = await JoblyApi.getJobs();
    jobs = jobs.filter(job => job.company_handle === company.handle);
    this.setState({
      jobs: jobs,
      company
    });
  }

  async handleApplyButton(id) {
    try {
      let jobIdx = this.state.jobs.findIndex(job => job.id === id);
      let job = this.state.jobs[jobIdx];
      job = { ...job, loading: true }
      this.setState(st => ({
        jobs: [...st.jobs.slice(0, jobIdx), job, ...st.jobs.slice(jobIdx + 1)]
      }));
      await JoblyApi.applyToJob(id);
      job = { ...job, loading: false }
      job.state = 'applied';
      this.setState(st => ({
        jobs: [...st.jobs.slice(0, jobIdx), job, ...st.jobs.slice(jobIdx + 1)]
      }));
    } catch (err) {
      this.setState(st => ({
        error: [...st.error, err]
      }));
    }
  }

  render() {
    return (
      <div>
        {this.props.loggedIn ?
          <div>
            <div className="Company-nd">
              <h1 className="Company-name"><strong>{this.state.company.name}</strong></h1>
              <h6>{this.state.company.description}</h6>
            </div>
            <div className="row">
              {this.state.jobs.sort((a, b) => a.salary - b.salary).map((job) => (
                <div key={job.id} className="Jobs-item col-lg-4 col-md-6 mt-3 px-5 text-center">
                  <JobCard job={job} applyToJob={this.handleApplyButton} />
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