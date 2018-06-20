import React, { Component } from 'react';
import PlaceItem from './PlaceItem/PlaceItem';
import './Sidebar.css';

export default class Sidebar extends Component {

  render() {

    const placesList = this.props.places.map((place, idx) => {
      return <PlaceItem key={`place_${place.name}`} {...place} />;
    });

    return (
      <div id="sidebar" className="col-sm-12 col-md-3 col-xl-2">
        {placesList}
      </div>
    );
  }

};

