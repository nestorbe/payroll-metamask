import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { Box } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

const StyledAlert = withStyles((theme) => ({
  root: {
      width: '30%',
      '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))(Alert);

const StyledTextField = withStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))(TextField);

class Contractors extends Component {
    constructor(props) {
      super(props);
      this.state = {
        address: '',
        amount: '',
        date: '',
        message: '',
        invoiceId: 0
      };
      this.invoicesArr = [];
      this.invoiceStorage = window.localStorage;
    }

  async componentDidMount() {
      const invoices = JSON.parse(this.invoiceStorage.getItem('invoices'));
      if(invoices == null) {
        this.invoicesArr = [];
      } else {
        this.invoicesArr = invoices;
        this.state.invoiceId = this.invoicesArr.length;
      }
  }

  sendInvoice = (event) => {
    const invoice = {
      id: this.state.invoiceId,
      address: this.state.address,
      date: this.state.date,
      amount: this.state.amount,
      paid: false
    }

    this.invoicesArr.push(invoice);
    this.invoiceStorage.setItem('invoices', JSON.stringify(this.invoicesArr));
    this.setState({ invoiceId: this.invoicesArr.length, message: 'Invoice stored!' });
    window.location.reload();
  }

  render() {
    return (
      <div>
        <h1><Chip label="Contractors Portal" color="primary" /></h1>
        <hr />
          <h1><Chip label="Submit new invoice" variant="outlined" color="secondary" size="small" /></h1>
          <div>
            <div>
              <input
                type="date"
                value={this.state.date}
                onChange={event => this.setState({ date: event.target.value})}
              />
            </div>
            <div>
              <StyledTextField
                id="standard-basic"
                label="Enter eth deposit address:"
                placeholder="ex. 0x00F51D0e"
                value={this.state.address}
                onChange={event => this.setState({ address: event.target.value})}
                />
            </div>
            <div>
              <StyledTextField
                id="standard-basic"
                label="Invoice amount:"
                placeholder="amount in ether"
                value={this.state.amount}
                onChange={event => this.setState({ amount: event.target.value})}
                />
            </div>
          </div>
          <div>
            <br></br>
            <Button variant="contained" color="primary" onClick={this.sendInvoice}>
              Submit
            </Button>
          </div>
        <br></br>
        <Box display="flex"
        alignItems="center"
        justifyContent="center">
          {this.state.message !== '' ? <StyledAlert severity="success">{this.state.message}</StyledAlert> : <div></div>}
        </Box>
      </div>
    );
  }
}

export default Contractors;
