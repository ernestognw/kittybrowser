import React, { Component } from 'react';
import { object } from 'prop-types';
import Web3 from 'web3';
import KittyCoreABI from '../contracts/KittyCoreABI.json';
import { CONTRACT_NAME, CONTRACT_ADDRESS } from '../config';
import InputForm from './InputForm';
import Kitty from './Kitty';

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
    let alert;
    alert = <div className={(this.state.kittyAlert ? 'alert alert-danger' : '')}>{this.state.kittyAlert}</div>;

    return (
      <div className="browser">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            <a className="navbar-brand" href="#">Kitty Browser</a>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">  
            </ul>
            <InputForm update={this.setKitty} />
          </div>
        </nav>
        {alert}
        <Kitty kitty={this.state.kitty} kittyId={this.state.kittyId} />
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object,
};

export default Browser;
