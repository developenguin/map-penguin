import React, { Component } from 'react';
import './PlaceItem.css';

export default class PlaceItem extends Component {

  onClick = () => {
    this.props.onClick(this.props.place);
  };

  onKeyUp = e => {

    // if Enter is pressed, treat it as a click
    if (e.which === 13) {
      this.onClick();
    }

  };

  render() {
    return (
      <div tabIndex="0" className={`place-item p-2${this.props.place.isActive ? ' active': ''}`} onClick={this.onClick} onKeyUp={this.onKeyUp}>{this.props.place.name}</div>
    );
  }

};
