// @flow
/* global google */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapStyles from './MapStyles';

export default class MapContainer extends Component {

  componentDidUpdate(prevProps) {
    this.loadMap();

    // Only get places if the center of the map has changed
    if (this.props.center && prevProps.center !== this.props.center) {
      this.getPlacesNearLatLong(this.props.center)
        .then(places => {
          this.props.setPlaces(places);
        })
        .catch(error => {
          console.log(error);
        })
    }

  }

  loadMap() {

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

  getPlacesNearLatLong = (latLong: object) => {

    const service = new google.maps.places.PlacesService(this.map);

    return new Promise((resolve, reject) => {

      service.nearbySearch({
        location: latLong,
        radius: 5000
      }, (results, status) => {

        const ServiceStatus = google.maps.places.PlacesServiceStatus;

        switch (status) {

          case ServiceStatus.OK:
            resolve(results);
            break;
          case ServiceStatus.ZERO_RESULTS:
            resolve([]);
            break;
          default:
            reject(status);

        }

      });

    });

  };

  render() {

    const style = {
      minHeight: '500px'
    };

    return (
      <div ref="map" className="col-sm-12 col-md-9 col-xl-10" style={style}>
        loading map...
      </div>
    );

  }
}
