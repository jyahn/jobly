import React, { Component } from "react";
import JoblyApi from "./JoblyApi"
import CompanyCard from './CompanyCard'
import { ListGroup, ListGroupItem, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Companies.css';

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
    let companies = await JoblyApi.getCompaniesBySearch({ search: this.state.search })
    this.setState({
      companies
    })
  }


  render() {
    return (
      <div className="Companies">
        <div className="Companies-content">
          <div className="Companies-search text-center col-4 offset-4 mt-3">
            <form className="form-group" onSubmit={this.handleSearchSubmit}>
              <Input
                type="text"
                value={this.state.search}
                name="search"
                placeholder="Enter search term.."
                onChange={this.handleSearchChange}
                className="Companies-input"
              />
              <Button className="Jobs-search-button btn btn-success btn-md mt-3">Search</Button>
            </form>
          </div>
          <div className="row justify-content-center">
            {this.state.companies.length ? (
              <ListGroup className="Companies-list text-center">
                {this.state.companies.map(company => (
                  <Link
                    className="Companies-link"
                    key={company.handle}
                    to={`/companies/${company.handle}`}
                  >
                    <ListGroupItem className="Companies-list-item">
                      <CompanyCard company={company} />
                    </ListGroupItem>
                  </Link>
                ))}
              </ListGroup>
            ) : (
                <h1>No Companies Found</h1>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Companies;


// return (
//   this.props.loggedIn ?
//     <div>
//       <div className="col-md-10 offset-md-1">
//         <h3 className="text-info" style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>Companies</h3>
//         <div className="Search mb-4">
//           <form className="form-inline" onSubmit={this.handleSearchSubmit}>
//             <input className="form-control form-control-lg flex-grow-1"
//               name="search"
//               value={this.state.search}
//               onChange={this.handleSearchChange}
//               placeholder="Enter search term .."></input>
//             <button type="submit" className="btn btn-lg btn-info">Submit</button>
//           </form>
//         </div>
//         <div className="CardList">
//           {this.state.companies.map((company) => (
//             <CompanyCard company={company} />
//           ))}
//         </div>
//       </div>
//     </div >
//     : <Redirect to="/login" />
// );