import React, { Component } from "react";
import JoblyApi from "./JoblyApi"
import CompanyCard from './CompanyCard'
import { Redirect } from 'react-router-dom';

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      search: ""
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }
  async componentDidMount() {
    let companies = await JoblyApi.getCompanies()
    this.setState({
      companies: companies
    })
  }

  handleSearchChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }


  async handleSearchSubmit(evt) {
    evt.preventDefault()
    let companies = await JoblyApi.getCompaniesSearch({ search: this.state.search })
    this.setState({
      companies: companies,
      search: ""
    })
  }


  render() {
    return (
      this.props.loggedIn ?
        <div className="col-md-10 offset-md-1">
          <div className="Search mb-4">
            <form className="form-inline" onSubmit={this.handleSearchSubmit}>
              <input className="form-control form-control-lg flex-grow-1"
                name="search"
                value={this.state.search}
                onChange={this.handleSearchChange}
                placeholder="Enter search term .."></input>
              <button type="submit" className="btn btn-lg btn-primary">Submit</button>
            </form>
          </div>
          <div className="CardList">
            {this.state.companies.map((company) => (
              <CompanyCard company={company} />
            ))}
          </div>
        </div>
        : <Redirect to="/login" />
    );
  }
}

export default Companies;