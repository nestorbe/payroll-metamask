import React, { Component } from 'react';
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  Link
} from "react-router-dom";
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
      </div>
    );
  }
}

export default Home;
