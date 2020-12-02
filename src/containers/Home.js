import React, { Component } from 'react';
import { StyledButton } from './Styles'
class Home extends Component {

  //Check if metamask is installed
  connectMetamask = async () => {
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
          {window.ethereum === undefined ? <StyledButton size="small" href="https://metamask.io/download.html">Install Metamask</StyledButton> : null}
        </div>
      </div>
    );
  }
}

export default Home;
