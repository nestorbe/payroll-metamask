import React, { Component } from 'react';
import './App.css';
import { web3 } from "../services"
import detectEthereumProvider from '@metamask/detect-provider';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

const StyledButton = withStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))(Button);

class Home extends Component {

  async componentDidMount() {
      const provider = await detectEthereumProvider();
      if(window.ethereum !== undefined) {
        window.ethereum.enable();
      } else {
        alert('Please install Metamask to use this application!')
      }
  }

  render() {
    return (
      <div>
        <br></br>
        <Chip label="home" />
        <hr />
        <div>
          <StyledButton color="primary" href="/contractors">
            Contractors Portal
          </StyledButton>
        </div>
        <div>
          <StyledButton color="secondary" href="/employer">
            Employer Portal
          </StyledButton>
        </div>
        <div>
          {window.ethereum === undefined ? <StyledButton size="small" href="https://metamask.io/download.html">Install Metamask</StyledButton> : <h1></h1>}
        </div>
      </div>
    );
  }
}

export default Home;
