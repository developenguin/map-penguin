// @flow
/* global google */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapStyles from './MapStyles';

export default class MapContainer extends Component {

  componentDidUpdate(prevProps) {

    this.loadMap();

    // Only get places if the center of the map has changed
    // (in practice, this only occurs when the city changes)

    if (this.props.center && prevProps.center !== this.props.center) {
      this.getPlacesNearLatLong(this.props.center)
        .then(places => {

          this.props.setPlaces(places.map(place => {

            place.isVisible = true;
            return place;

          }));

        })
        .catch(error => {
          console.log(error);
        });
    }

    // Only set markers if they are present
    if (this.props.markers) {
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
   * Gets places near a lat/long object
   * @param latLong
   * @returns {Promise<any>}
   */
  getPlacesNearLatLong = (latLong: object) => {

    const service = new google.maps.places.PlacesService(this.map);

    return new Promise((resolve, reject) => {

      service.nearbySearch({
        location: latLong,
        radius: 5000,
        type: 'park'
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

  /**
   * Get the markers from the props and put them on the map
   * Also extend the map to fit all of the markers
   */
  setMarkersOnMap = () => {

    const bounds = new google.maps.LatLngBounds();

    this.props.markers.forEach(marker => {
      marker.setMap(this.map);
      bounds.extend(marker.position);
    });

    this.map.fitBounds(bounds);

  };

  render() {

    const style = {
      minHeight: '500px'
    };

    return (
      <div ref="map" className="col-sm-12 col-md-8 col-lg-9 col-xl-10" style={style}>
        loading map...
      </div>
    );

  }
}
