import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

const provider = detectEthereumProvider();
const web3 = () => {
  if(provider) {
    new Web3(window.web3.currentProvider);
  } else {
    alert('Please install Metamask to use this application!')
  }
}

export default web3;
