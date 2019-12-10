import React, { Component } from 'react';
import './ErrorHandler.css';
import uuid from 'uuid/v4';

class ErrorHandler extends Component {
  render() {
    return (
      <div className="ErrorHandler">
        {this.props.error.map(error => (
          <h3 key={uuid()}>{error}</h3>
        ))}
      </div>
    );
  }
}

export default ErrorHandler;