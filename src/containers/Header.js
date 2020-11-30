import React, { Component } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const StyledButton = withStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))(Button);

class Header extends Component {

  render() {
    return (
      <div>
        <Box display="flex"
        alignItems="center"
        justifyContent="center">
          <Breadcrumbs aria-label="breadcrumb">
            <StyledButton href="/">
              Home
            </StyledButton>
            <StyledButton color="primary" href="/contractors">
              Contractors Portal
            </StyledButton>
            <StyledButton color="secondary" href="/employer">
              Employer Portal
            </StyledButton>
          </Breadcrumbs>
        </Box>
      </div>
    );
  }
}

export default Header;
