import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, } from "react-router-dom";
import { AppRouter, Header } from './'

class App extends Component {

  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Header />
          <AppRouter />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
