import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import "./JobCard.css"
import { Button, Input } from 'reactstrap';


class JobCard extends Component {
  render() {
    // console.log("State in JOBCARD", this.props)
    return (

      <div className="JobCard card mb-4">
        <div className="JobCard-title card-header">
          <h5>{this.props.job.title}</h5>
        </div>
        <div className="JobCard-se card-body">
          <p className="JobCard-salary" >
            Salary: {this.props.job.salary}
          </p>
          <p className="JobCard-equity">{this.props.job.equity}
            <span className="JobCard-eqy"> EQT</span>
          </p>
        </div>
        <div className ="JobCard-btn">
        <Button className="JobCard-button btn btn-success btn-sm mb-2">Apply</Button>
        </div>
      </div>
    )
  }
}

export default JobCard;



// render() {
//   console.log("State in JOBCARD", this.props)
//   return (
//     <div className="Card card" style= {{marginLeft:'20px'}}>
//       <div className="card-body">
//         <h6 className="card-title d-flex justify-content-between">
//           <span className="text-capitalize">{this.props.job.title}</span>
//         </h6>
//         <div>Salary: {this.props.job.salary}</div>
//         <div>Equity: {this.props.job.equity}</div>
//         <button type="submit" className="btn btn-sm btn-block btn-info" >Apply</button>
//       </div>
//     </div>
//   );
// }
// }