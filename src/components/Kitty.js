import React from 'react';
import moment from 'moment';
import {KITTY_URL} from '../config';


export default function (props) {
  return (
    <div className="card col-6 offset-md-3">
      <img src={KITTY_URL + props.kittyId + ".svg"} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">Genes: {props.kitty.genes}</h5>
        <p className="card-text">Generation: {props.kitty.generation} </p>
        <p>Birthday: {moment(parseInt(props.kitty.birthTime, 10)*1000).format("DD MMMM YYYY")}</p>
      </div>
    </div>
  )
}