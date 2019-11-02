import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Routes from './Routes';
import JoblyApi from './JoblyApi';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentUser: {
      }
    }

    this.changeLoginState = this.changeLoginState.bind(this);
  }

  async componentDidMount() {
    if (localStorage.getItem("_token")) {
      let user = await JoblyApi.getUser(localStorage.getItem("username"))
      this.setState({
        loggedIn: true,
        currentUser: user
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
    // console.log("state in app", this.state);
    return (
      <div>
        <BrowserRouter>
          <NavBar
            loggedIn={this.state.loggedIn}
          />
          <Routes
            loggedIn={this.state.loggedIn}
            currentUser = {this.state.currentUser}
            changeLoginState={this.changeLoginState} />
        </BrowserRouter>
      </div >
    )
  }
}

export default App;
