import React, { Component } from 'react';
import { object } from 'prop-types';
import Web3 from 'web3';
import KittyCoreABI from 'contracts/KittyCoreABI.json';
import { CONTRACT_NAME, CONTRACT_ADDRESS } from '../config';

class Browser extends Component {

  constructor(props, context) {
      super(props);
      this.contracts = context.drizzle.contracts;

      this.state = {
        kitty: {
          genes: '626837621154801616088980922659877168609154386318304496692374110716999053',
          generation: 0,
          birthTime: '2017-11-23T06:19:59.000Z'
        },
        kittyId: 1,
        kittyError: ''
      }
    }
  
  componentDidMount() {
    const web3 = new Web3(window.web3.currentProvider);

    // Initialize the contract instance

    const kittyContract = new web3.eth.Contract(
      KittyCoreABI, // import the contracts's ABI and use it here
      CONTRACT_ADDRESS,
    );

    // Add the contract to the drizzle store

    this.context.drizzle.addContract({
      contractName: CONTRACT_NAME,
      web3Contract: kittyContract,
    });
  }

  getKitty = id => {
    return this.context.drizzle.contracts.CryptoKitties.methods.getKitty(id).call();
  }

  setKitty = id => {
    // Check id
    id = this.isValid(id);
    this.getKitty(id).then(kitty => {
      this.setState({
        kitty: kitty,
        kittyId: id,
        kittyAlert: ''
      })
    }).catch(error => {
      console.log('Kitty Not Found', error);
      this.setState({
        kittyAlert: 'Kitty not Found'
      })
    });
  }

  isValid = number => {
    return isNaN(number) ? 1 : number;
  }

  render() {
    return (
      <div className="browser">
        <h1>
          Kitty Browser
        </h1>

        {/* Input to type in the kitty ID here */}

        {/* Display Kitty info here */}
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object,
};

export default Browser;
