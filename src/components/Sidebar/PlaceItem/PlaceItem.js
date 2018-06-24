import React, { Component } from 'react';
import './PlaceItem.css';

export default class PlaceItem extends Component {

  onClick = () => {
    this.props.onClick(this.props.place);
  };

  render() {
    return (
      <div className={`place-item p-2${this.props.place.isActive ? ' active': ''}`} onClick={this.onClick}>{this.props.place.name}</div>
    );
  }

};
