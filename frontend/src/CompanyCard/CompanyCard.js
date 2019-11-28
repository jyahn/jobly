import React, { Component } from "react";
import "./CompanyCard.css"

class CompanyCard extends Component {
  render() {
    return (
      <div className="row CompanyCard">
        <div className="col-md-2 CompanyCard-logo-container">
          <img
            className="CompanyCard-logo"
            src={this.props.company.logo_url}
            alt="Company" />
        </div>
        <div className="CompanyCard-nd col-md-9">
          <div className="CompanyCard-name"><h5><strong>{this.props.company.name}</strong></h5></div>
          <div className="CompanyCard-desc"><h6>{this.props.company.description}</h6></div>
        </div>
      </div>
    )
  }
}

export default CompanyCard;



