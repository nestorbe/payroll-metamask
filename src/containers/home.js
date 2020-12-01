import React, { Component } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Chip from '@material-ui/core/Chip';
import { StyledButton } from './Styles'

class Home extends Component {

  //Check if metamask is installed
  connectMetamask = async () => {
    const provider = await detectEthereumProvider();
    if(window.ethereum !== undefined) {
      window.ethereum.enable();
    } else {
      alert('Please install Metamask to use this application!')
    }
  }

  componentDidMount() {
    this.connectMetamask();
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
