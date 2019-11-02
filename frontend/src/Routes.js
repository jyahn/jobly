import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import Profile from './Profile'
import Login from './Login';
import Logout from './Logout';


class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/companies/'
          render={() => <Companies loggedIn={this.props.loggedIn} />} />
        <Route exact path='/companies/:company'
          render={rtProps => <Company
            {...rtProps}
            loggedIn={this.props.loggedIn} />} />
        <Route exact path='/jobs/'
          render={() => <Jobs loggedIn={this.props.loggedIn} />} />
        <Route exact path='/profile/'
          render={() => <Profile
            loggedIn={this.props.loggedIn}
            currentUser={this.props.currentUser} />} />
        <Route exact path='/login/'
          render={() => <Login
            loggedIn={this.props.loggedIn}
            changeLoginState={this.props.changeLoginState} />} />
        <Route exact path='/logout/'
          render={() => <Logout
            loggedIn={this.props.loggedIn}
            changeLoginState={this.props.changeLoginState} />} />
      </Switch>
    );
  }
}

export default Routes;
