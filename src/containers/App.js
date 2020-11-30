import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
} from "react-router-dom";

import { AppRouter, Header } from './'

class App extends Component {
    constructor(props) {
      super(props);
    }

  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
