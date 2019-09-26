import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Routes from './Routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentUser: {}
    }

    this.changeLoginState = this.changeLoginState.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("_token")) {

      this.setState({
        loggedIn: true
      })
    }
    else {
      this.setState({
        loggedIn: false
      })
    }
  }

  changeLoginState(token) {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }
  render() {
    console.log("state in app", this.state);
    return (
      <div>
        <BrowserRouter>
          <NavBar loggedIn={this.state.loggedIn} />
          <Routes changeLoginState={this.changeLoginState} />
        </BrowserRouter>
      </div >
    )
  }
}

export default App;
