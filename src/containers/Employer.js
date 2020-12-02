import React, { Component } from 'react';
import { web3 } from "../services"
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { Box } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { StyledCard, StyledAlert } from './Styles'

class Employer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      paying: false,
    };
    this.invoiceStorage = window.localStorage;
    this.invoices = JSON.parse(this.invoiceStorage.getItem('invoices'));
  }
  //Pay an invoice using Metamask and then setting invoice as PAID
  handlePay = async (id) => {
    //instantiate the invoice object
    const invoiceToPay = this.invoices[id];
    //send metamask transaction
    this.setState({ paying: true });
    await web3.eth.sendTransaction({
        to: invoiceToPay.address,
        from: web3.givenProvider.selectedAddress,
        value: web3.utils.toWei(invoiceToPay.amount, 'ether'),
    })
    //set invoice paid flag to true
    invoiceToPay.paid = true;
    //update the localStorage array
    this.invoiceStorage.setItem('invoices', JSON.stringify(this.invoices));
    this.setState({ message: 'Invoice paid succesfully!', paying: false });
    //delay for success message to update
    const updateMessage = () => {
      setTimeout( function() {
        this.setState({ message: '' });
      }.bind(this), 5000);
    }

    updateMessage();
  };

  //Render cards with invoices method
  renderInvoices() {
    return (
      <div>
        {this.invoices.map(invoice => (
          <StyledCard key={invoice.id}>
            <CardContent>
              <Typography color="textPrimary">
                Invoice#{invoice.id}
              </Typography>
              <Typography color="textSecondary">
                date: {invoice.date}
              </Typography>
              <Typography color="textSecondary">
                address: {invoice.address}
              </Typography>
              <Typography color="textSecondary">
                amount owed: {invoice.amount} ether.
              </Typography>
              <Typography color="textSecondary">
                reason: {invoice.reason}
              </Typography>
              <Box display="flex"
                   alignItems="center"
                   justifyContent="center">
                {invoice.paid === false ?
                  <Button variant="contained" color="secondary" onClick={() => this.handlePay(invoice.id)}>pay invoice</Button> :
                  <Button variant="contained" disabled>paid</Button>}
              </Box>
            </CardContent>
          </StyledCard>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Chip label="Employer Portal" color="secondary" />
        <hr />
        {this.invoices !== null ? this.renderInvoices() : <Box display="flex" alignItems="center" justifyContent="center">
        <StyledAlert severity="warning">There are no invoices to review!</StyledAlert> </Box>}
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

export default Employer;
