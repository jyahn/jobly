import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Routes from './Routes';
import JoblyApi from './JoblyApi';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentUser: ''
      // loading: true
    }

    this.changeLoginState = this.changeLoginState.bind(this);
  }

  async componentDidMount() {
    let token = localStorage.getItem('_token');
    if (token) {
      let user = await JoblyApi.getUser(localStorage.getItem("username"))
      this.setState({
        loggedIn: true,
        currentUser: user,
        loading: false
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
    // if (this.state.loading) {
    //   return "Loading..."
    // }

    return (
      <div>
        <BrowserRouter>
          <NavBar
            loggedIn={this.state.loggedIn}
          />
          <Routes
            loggedIn={this.state.loggedIn}
            currentUser={this.state.currentUser}
            changeLoginState={this.changeLoginState} />
        </BrowserRouter>
      </div >
    )
  }
}

export default App;
