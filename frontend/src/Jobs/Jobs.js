import React, { Component, Fragment } from "react";
import JobCard from '../JobCard/JobCard';
import JoblyApi from '../JoblyApi';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import { Input, Button } from 'reactstrap';
import './Jobs.css';


class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      filteredJobs: [],
      salaryFilter: false,
      searchFilter: false,
      salaryThreshold: '',
      search: "",
      searchByWord: "",
      error: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSalaryFilter = this.handleSalaryFilter.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleApplyButton = this.handleApplyButton.bind(this);
  }


  convertSalary(salary) {
    let result = ''
    let salaryString = salary.toString();
    let count = 0;
    for (let i = salaryString.length; i > 0; i--) {
      if (count === 3) {
        result = ',' + result;
        i++;
        count = 0;
      }
      else {
        result = salaryString[i - 1] + result;
        count += 1;
      }
    }
    return '$' + result
  }

  async componentDidMount() {
    let jobs = await JoblyApi.getJobs()
    jobs.sort((a, b) => a.salary - b.salary);
    this.setState({
      jobs
    })
  }

  // Undo salary filter
  async handleUndo() {
    // if there is no existing search filter, we query all jobs
    if (this.searchFilter === false) {
      let jobs = await JoblyApi.getJobs()
      jobs.sort((a, b) => a.salary - b.salary);
      this.setState({
        jobs,
        salaryFilter: false,
        salaryThreshold: ''
      })
      // if there is an existing search filter, we query by the existing search filter
    } else {
      let jobs = await JoblyApi.getJobsBySearch({ search: this.state.search })
      jobs.sort((a, b) => a.salary - b.salary);
      this.setState({
        jobs,
        salaryFilter: false,
        salaryThreshold: ''
      })
    }
  }

  async handleSalaryFilter(evt, salary) {
    evt.preventDefault();
    // if there is no existing search filter, we query by the new salary filter
    if (this.state.searchFilter === false) {
      let jobs = await JoblyApi.getJobsByMinSalary({ salary: salary })
      jobs.sort((a, b) => a.salary - b.salary);
      this.setState({
        jobs,
        filteredJobs: jobs,
        salaryFilter: true,
        salaryThreshold: salary
      })
      // if there is an existing search filter, we filter our already search-filtered list
      // further to only include jobs with salaries surpassing the new salary filter
    } else {
      let jobs = this.state.filteredJobs.filter(job => (job.salary >= salary))
      jobs.sort((a, b) => a.salary - b.salary);
      this.setState({
        jobs,
        filteredJobs: jobs,
        salaryFilter: true,
        salaryThreshold: salary
      })
    }
  }

  handleChange(evt) {
    evt.preventDefault();
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    let jobs = await JoblyApi.getJobsByMinSalary({ salary: this.state.salaryFilter })
    jobs.sort((a, b) => a.salary - b.salary);
    this.setState({
      jobs
    })
  }

  async handleSearchSubmit(evt) {
    evt.preventDefault()
    let searchFilter = true;
    if (this.state.search === "") {
      searchFilter = false;
    }
    // if there is no existing salary filter, we query based on the search filter
    if (this.state.salaryFilter === false) {
      let jobs = await JoblyApi.getJobsBySearch({ search: this.state.search })
      jobs.sort((a, b) => a.salary - b.salary);
      this.setState({
        jobs,
        filteredJobs: jobs,
        searchFilter,
        searchByWord: this.state.search
      })
      // if there is an existing salary filter
    } else {
      // if there is no search filter, we query based on the existing salary filter
      if (searchFilter === false) {
        let jobs = await JoblyApi.getJobsByMinSalary({ salary: this.state.salaryThreshold })
        jobs.sort((a, b) => a.salary - b.salary);
        this.setState({
          jobs,
          filteredJobs: jobs,
          searchFilter,
          searchByWord: this.state.search
        })
      }
      // if there is an existing salary filter we filter our already salary-filtered list
      // further to only include jobs with job titles matching the new search filter
      else {
        let jobs = this.state.filteredJobs.filter(job => (job.title.toLowerCase().includes(this.state.search.toLowerCase())))
        jobs.sort((a, b) => a.salary - b.salary);
        this.setState({
          jobs,
          searchFilter,
          searchByWord: this.state.search
        })
      }
    }
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
    console.log('props in jobs', this.props);
    if (!this.props.loggedIn) {
      return <ErrorHandler error={['Oops! You must be logged in to view this page.']} />;
    }
    if (this.state.error.length > 0) {
      return <ErrorHandler error={this.state.error} />
    }
    return (

      <div className="Jobs">
        {/* Search filter */}
        <div className="Jobs-Search col-6 mt-3">
          <form
            className="Jobs-SearchForm form-group"
            onSubmit={this.handleSearchSubmit}>
            <div className="input-group">
              <input
                className="Jobs-input form-control"
                type="text"
                value={this.state.search}
                name="search"
                placeholder="Enter search term.."
                onChange={this.handleChange} />
              <span className="input-group-btn">
                <Button className="Search-button btn btn-md">Search</Button>
              </span>
            </div>
            {this.state.searchFilter ?
              <h6 id="filter-descrip">
                Displaying {this.state.searchByWord} jobs {this.state.salaryFilter ? 'above ' + this.convertSalary(this.state.salaryThreshold) : null} ...
                </h6>
              : null}

          </form>
        </div>
        <table className="Jobs-Salary row ml-5 mr-5">
          <tbody>
            <tr>
              {/* Salary Filter */}
              <td className="SalaryForm" valign="top">
                <h5 className="Salary-header mt-3"><b>Salary estimate</b></h5>
                <div className="row">
                  <div className="col">
                    {this.state.salaryThreshold ?
                      <strong>
                        {this.convertSalary(this.state.salaryThreshold)} <a href="#" onClick={this.handleUndo}>Undo</a>
                      </strong>
                      :
                      <Fragment>
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
                      </Fragment>
                    }
                  </div>
                </div>
              </td>

              {/* Display Jobs */}
              {this.state.jobs.length ?
                <td className="container">
                  <div className="Jobs-content row text-center">
                    {this.state.jobs.map(job => (
                      <div key={job.id} className="Jobs-item col-lg-4 col-md-6 mt-3 px-3">
                        <JobCard job={job} convertSalary={this.convertSalary} applyToJob={this.handleApplyButton} />
                      </div>
                    ))
                    }
                  </div>
                </td>
                :
                <h1>Loading...</h1>
              }

            </tr>
          </tbody>
        </table>
      </div >
    );
  }
}

export default Jobs;