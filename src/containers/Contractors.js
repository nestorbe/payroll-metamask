import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { StyledTextField, StyledAlert, StyledTextFieldMulti } from './Styles'

class Contractors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      amount: '',
      date: '',
      message: '',
      reason: '',
    };
    this.invoicesArr = [];
    this.invoiceStorage = window.localStorage;
    this.invoiceId = 0;
  }
  //Invoices array update on localStorage
  updateInvoices = () => {
    const invoices = JSON.parse(this.invoiceStorage.getItem('invoices'));
    if(invoices == null) {
      this.invoicesArr = [];
    } else {
      this.invoicesArr = invoices;
      this.invoiceId = this.invoicesArr.length;
    }
  }

  //add an invoice to localStorage
  sendInvoice = (event) => {
    this.updateInvoices();
    const invoice = {
      id: this.invoiceId,
      address: this.state.address,
      date: this.state.date,
      amount: this.state.amount,
      reason: this.state.reason,
      paid: false,
    }

    this.invoicesArr.push(invoice);
    this.invoiceStorage.setItem('invoices', JSON.stringify(this.invoicesArr));
    this.setState({
      message: 'Invoice stored succesfully!',
      address: '',
      amount: '',
      date: '',
      reason: '',
    });

    const RemoveMessageWithDelay = () => {
      setTimeout( function() {
        this.setState({ message: '' });
      }.bind(this), 5000);
    }

    RemoveMessageWithDelay();
  }

  render() {
    return (
      <div>
        <Chip label="Contractors Portal" color="primary" />
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
            <div>
              <StyledTextFieldMulti
                id="standard-multiline-static"
                label="Reason:"
                multiline
                rows={4}
                variant="outlined"
                value={this.state.reason}
                onChange={event => this.setState({ reason: event.target.value})}
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
          {this.state.message !== '' ? <StyledAlert severity="success">{this.state.message}</StyledAlert> : null}
        </Box>
      </div>
    );
  }
}

export default Contractors;
