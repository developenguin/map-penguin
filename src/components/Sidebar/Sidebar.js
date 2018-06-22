import React, { Component } from 'react';
import PlaceItem from './PlaceItem/PlaceItem';
import './Sidebar.css';

export default class Sidebar extends Component {

  onClickItem = item => {
    this.props.onClickItem(item);
  };

  onInputChange = e => {

  };

  render() {

    const placesList = this.props.places.map(place => {
      return <PlaceItem key={`place_${place.name}`} place={place} onClick={this.onClickItem}/>;
    });

    return (
      <div id="sidebar" className="col-sm-12 col-md-4 col-lg-3 col-xl-2 p-0">
        <input type="text" className="p-2 w-100" name="filter-locations" placeholder="Type to filter locations" onChange={this.onInputChange}/>
        <div className="places-container">
          {placesList}
        </div>
      </div>
    );
  }

};

