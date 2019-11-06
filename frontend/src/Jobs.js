import React, { Component, Fragment } from "react";
import JobCard from './JobCard';
import JoblyApi from './JoblyApi';
// import { Redirect } from 'react-router-dom';
import { Input, Button } from 'reactstrap';
import './Jobs.css'


class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      salaryFilter: false,
      search: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSalaryFilter = this.handleSalaryFilter.bind(this);
  }

  async componentDidMount() {
    let jobs = await JoblyApi.getJobs()
    jobs.sort((a, b) => a.salary - b.salary);
    this.setState({
      jobs
    })
  }


  async handleSalaryFilter(evt, salary) {
    console.log("salary in filter", salary)
    evt.preventDefault();
    let jobs = await JoblyApi.getJobsByMinSalary({ salary: salary })
    console.log("jobs is ", jobs)
    jobs.sort((a, b) => a.salary - b.salary);
    this.setState({
      jobs,
      salaryFilter: true
    })
  }

  handleChange(evt) {
    evt.preventDefault();
    console.log("hello")
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    if (this.state.salaryFilter === false) {
      let jobs = await JoblyApi.getJobsByMinSalary({ salary: this.state.salaryFilter })
      jobs.sort((a, b) => a.salary - b.salary);
      this.setState({
        jobs
      })
    }
    else {
      //modify the jobs in state and only return the ones that meet the search criteria.
      //implement the vice versa logic for if search is submitted first and then salary filter is submitted 2nd.
    }
  }

  async handleSearchSubmit(evt) {
    evt.preventDefault()
    let jobs = await JoblyApi.getJobsBySearch({ search: this.state.search })
    jobs.sort((a, b) => a.salary - b.salary);
    this.setState({
      jobs
    })
  }

  render() {
    console.log("this.state in jobs", this.state)
    console.log("this.props in jobs", this.props)
    return (
      <div className="Jobs">
        <div className="Jobs-search col-6 mt-3">
          <form
            className="Jobs-searchForm form-group"
            onSubmit={this.handleSearchSubmit}>
            <input
              className="Jobs-input form-control"
              type="text"
              value={this.state.search}
              name="search"
              placeholder="Enter search term.."
              onChange={this.handleChange} />
            <Button className="Search-button btn btn-md mt-3">Search</Button>
          </form>
        </div>
        <table className="Jobs-content row ml-5 mr-5">

          <tbody>
            <tr>
              <td className="SalaryForm" valign="top">
                <h5 className="Salary-header mt-3"><b>Salary estimate</b></h5>
                <div className="row">
                  <div className="col">
                    <a href="#"
                      onClick={(e) => { this.handleSalaryFilter(e, 50000) }}> $50,000+</a> <br />
                    <a href="#"
                      onClick={(e) => { this.handleSalaryFilter(e, 75000) }} > $75,000+</a> <br />
                    <a href="#"
                      onClick={(e) => { this.handleSalaryFilter(e, 100000) }}> $100,000+</a> <br />
                    <a href="#"
                      onClick={(e) => { this.handleSalaryFilter(e, 125000) }} > $125,000+</a> <br />
                    <a href="#"
                      onClick={(e) => { this.handleSalaryFilter(e, 150000) }} > $150,000+</a> <br />
                    <a href="#"
                      onClick={(e) => { this.handleSalaryFilter(e, 175000) }} > $175,000+</a> <br />
                  </div>
                </div>
              </td>

              {this.state.jobs.length ? (
                <td className="container">
                  <div className="row">
                    {this.state.jobs.map(job => (
                      <div key={job.id} className="Jobs-item col-lg-4 col-md-6 mt-3 px-3">
                        <JobCard job={job} handleClick={this.handleClick} />
                      </div>
                    ))
                    })
                </div>
                </td>) : (<h1>No Jobs Found</h1>
                )}
            </tr>
          </tbody>
        </table>
      </div >
    );
  }
}

export default Jobs;