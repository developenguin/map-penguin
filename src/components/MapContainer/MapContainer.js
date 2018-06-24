// @flow
/* global google */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapStyles from './MapStyles';

export default class MapContainer extends Component {

  componentDidUpdate(prevProps) {

    this.loadMap();

    // Only set markers if places are passed down
    if (this.props.places) {
      this.setMarkersOnMap();
    }

  }

  /**
   * Create the Google Map to draw on
   */
  loadMap() {

    // If the google prop is available, create a map and set it.

    if (this.props && this.props.google) {

      const { google } = this.props,
            maps = google.maps,

            mapRef = this.refs.map,
            node = ReactDOM.findDOMNode(mapRef),

            mapConfig = Object.assign({}, {
              center: this.props.center,
              zoom: 14,
              styles: mapStyles
            });

      this.map = new maps.Map(node, mapConfig);

    }

  }

  /**
   * Get the markers from the props and put them on the map
   * Also extend the map to fit all of the markers
   */
  setMarkersOnMap = () => {

    const bounds = new google.maps.LatLngBounds(),
          markers = this.getMarkersFromPlaces(this.props.places);

    markers.forEach(marker => {
      marker.setMap(this.map);
      bounds.extend(marker.position);
    });

    this.map.fitBounds(bounds);

  };

  /**
   * Convert an array of places into an array of Google Maps-compatible markers
   * @param places
   * @returns {Array}
   */
  getMarkersFromPlaces = (places: array) => {

    const markers = [];

    places.forEach(place => {

      if (!place.isVisible) {
        return;
      }

      const position = {
        lat: place.location.lat,
        lng: place.location.lng
      };

      const marker = new google.maps.Marker({
        position,
        name: place.name,
        animation: place.isActive ? google.maps.Animation.BOUNCE : null,
        map: null
      });

      marker.addListener('click', e => {
        this.props.onClickMarker(place);
      });

      markers.push(marker);

    });

    return markers;

  };

  render() {

    const style = {
      minHeight: '500px'
    };

    const className = this.props.isPlaceActive
      ? 'col-sm-12 col-md-8 col-lg-4 col-xl-5'
      : 'col-sm-12 col-md-8 col-lg-9 col-xl-10';

    return (
      <div ref="map" className={className} style={style}>
        loading map...
      </div>
    );

  }
}
