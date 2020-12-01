import React, { Component } from 'react';
import { Switch, Route, } from "react-router-dom";
import { Home, Contractors, Employer, Header } from "./"

class AppRouter extends Component {

  render() {
    return (
      <Switch>
        <Route path="/contractors">
          <Header />
          <Contractors />
        </Route>
        <Route path="/employer">
          <Header />
          <Employer />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    );
  }
}

export default AppRouter;
