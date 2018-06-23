import React, { Component } from 'react';
import PlaceItem from './PlaceItem/PlaceItem';
import './Sidebar.css';

export default class Sidebar extends Component {

  /**
   * Event handler for a click on an item
   * @param item
   */
  onClickItem = item => {
    this.props.onClickItem(item);
  };

  /**
   * Event handler for changing the value of the filter field
   * @param e
   */
  onInputChange = e => {
    this.props.onFilterLocations(e.target.value);
  };

  render() {

    const placesList = this.props.places
      .filter(place => {
        return place.isVisible;
      })
      .map(place => {
      return <PlaceItem key={`place_${place.id}`} place={place} onClick={this.onClickItem}/>;
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

