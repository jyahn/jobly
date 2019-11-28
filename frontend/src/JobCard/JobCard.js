import React, { Component } from "react";
import "./JobCard.css"
import { Button } from 'reactstrap';

class JobCard extends React.PureComponent {

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

  render() {
    return (
      <div className="JobCard card mb-4">
        <div className="JobCard-title card-header">
          <h5 className="Job-title"><strong>{this.props.job.title}</strong></h5>
        </div>
        <div className="JobCard-se card-body">
          <p className="JobCard-salary" >
            Salary: {this.convertSalary(this.props.job.salary)}
          </p>
          <p className="JobCard-equity">
            {Math.trunc(this.props.job.equity * 100) + '%'}
            <span className="JobCard-eqy"> EQT</span>
          </p>
        </div>
        <div className="JobCard-btn">
          <Button
            onClick={() => this.props.applyToJob(this.props.job.id)}
            disabled={this.props.job.state === 'applied' || this.props.loading}
            className="JobCard-button btn btn-sm my-2"
            id={this.props.job.state === 'applied' ? '' : 'JobCard-active'}>
            {this.props.job.loading
              ? <i class="fas fa-spinner" />
              : this.props.job.state === 'applied'
                ? <span id="Applied-text">Applied </span>
                : <span id="Apply-text" style={{ opacity: 1 }}>Apply</span>}
          </Button>
        </div>
      </div>
    )
  }
}

export default JobCard;