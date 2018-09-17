import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';

class InputForm extends Component {
  
  constructor(props, context) {
    super(props);
  }

  updateId = event => {
    event.preventDefault();
    let id = event.target.value;
    this.props.update(id);
  }

  render(){
    return (
      <form className="kitty-form form-inline my-2 my-lg-0" onSubmit={this.updateId}>
        <input className='form-control mr-sm-2' type="number" name="kittyId" placeholder="# kitty id" onChange={this.updateId.bind(this)} />
      </form>
    )
    
  }

}

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
  };
}

export default drizzleConnect(InputForm, mapStateToProps);
