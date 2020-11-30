import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
} from "react-router-dom";
import { AppRouter } from './'

class App extends Component {

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
