import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./CardList.css"

class CompanyCard extends Component {
  render() {
    return (
      <Link className="Card card" exact to={`/companies/${this.props.company.handle}`}>
        <div className="card-body">
          <h6 className="card-title d-flex justify-content-between" />
          {this.props.company.name}
          <p className="card-text">{this.props.company.description}</p>
        </div>
      </Link>
    );
  }
}

export default CompanyCard;