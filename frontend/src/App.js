import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Routes from './Routes';


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar />
          <Routes />
        </BrowserRouter>
      </div >
    )
  }
}

export default App;
