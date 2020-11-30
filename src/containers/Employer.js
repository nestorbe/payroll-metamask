import React, { Component } from 'react';
import { web3 } from "../services"
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const StyledCard = withStyles(() => ({
  root: {
    minWidth: 275,
    display: 'inline-block',
    margin: '0 1px',
    transform: 'scale(0.9)',
    fontSize: 14,
    marginBottom: 12,
  },
}))(Card);

const StyledAlert = withStyles((theme) => ({
  root: {
      width: '30%',
      '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))(Alert);

class Employer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        message: '',
      };
      this.invoiceStorage = window.localStorage;
      this.invoices = JSON.parse(this.invoiceStorage.getItem('invoices'));
    }

  handlePay = async (id) => {
    //instantiate the invoice object
    const invoiceToPay = this.invoices[id];
    //send metamask transaction
    web3.eth.sendTransaction({
        to: invoiceToPay.address,
        from: web3.givenProvider.selectedAddress,
        value: web3.utils.toWei(invoiceToPay.amount, 'ether'),
    })
    //set invoice paid flag to true
    invoiceToPay.paid = true;
    //update the localStorage array
    this.invoiceStorage.setItem('invoices', JSON.stringify(this.invoices));
    //delay for success message and reload
    const ShowMessageWithDelay = () => {
      setTimeout( function() {
        this.setState({ message: 'Invoice paid succesfully!' });
      }.bind(this), 5000);
    }

    const RefreshPageWithDelay = () => {
      setTimeout( function() {
        window.location.reload();
      }.bind(this), 9000);
    }

    ShowMessageWithDelay();
    RefreshPageWithDelay();
    };

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
              <Box display="flex"
              alignItems="center"
              justifyContent="center">
                {invoice.paid === false ? <Button variant="contained" color="secondary" onClick={() => this.handlePay(invoice.id)}>pay invoice</Button> : <Button variant="contained" disabled>
  paid
</Button>}
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
        <h1><Chip label="Employer Portal" color="secondary" /></h1>
        <hr />
        {this.invoices !== null ? this.renderInvoices() : <Box display="flex"
                                                              alignItems="center"
                                                              justifyContent="center">
        <StyledAlert severity="warning">There are no invoices to review!</StyledAlert>
        </Box>}
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
