import React, { Component } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
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
        <Route exact path='/companies/:company' render={rtProps => <Company {...rtProps} />} />
        <Route exact path='/companies/' render={() => <Companies />} />
        <Route exact path='/jobs/' render={() => <Jobs />} />
        <Route exact path='/profile/' render={() => <Profile />} />
        <Route exact path='/login/' render={() => <Login changeLoginState={this.props.changeLoginState} />} />
        <Route exact path='/logout/' render={() => <Logout changeLoginState={this.props.changeLoginState} />} />
      </Switch>
    );
  }
}

export default Routes;
