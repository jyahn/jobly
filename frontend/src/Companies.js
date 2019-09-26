import React, { Component } from "react";
import JoblyApi from "./JoblyApi"
import CompanyCard from './CompanyCard'

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    }

  }
  async componentDidMount() {
    let companies = await JoblyApi.getCompanies()
    console.log(companies)
    this.setState({
      companies: companies
    })
  }
  render() {
    console.log("state in companies", this.state);
    return (
      <div className="col-md-10 offset-md-1">
        <div className="CardList">
          {this.state.companies.map((company) => (
            <CompanyCard company={company} />
          ))}
        </div>
      </div>
    );
  }
}

export default Companies;