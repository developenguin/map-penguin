// @flow
/* global google */

import React, { Component } from 'react';
import CitySearch from './components/CitySearch/CitySearch';
import Header from './components/Header/Header';
import MapContainer from './components/MapContainer/MapContainer';
import Sidebar from './components/Sidebar/Sidebar';
import { GoogleApiWrapper } from 'google-maps-react';
import './App.css';

class App extends Component {

  state = {
    places: [],
    cityName: 'Amsterdam',
    cityLatLong: {}
  };

  componentDidMount() {
    this.setCityLocation();
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.cityName !== prevState.cityName) {
      this.setCityLocation();
    }

  }

  /**
   * Sets the current city location into the state
   * @returns {Promise<void>}
   */
  async setCityLocation() {
    const location = await this.getCityLocation(this.state.cityName);

    this.setState({
      cityLatLong: { lat: location.lat(), lng: location.lng() }
    });

  }

  /**
   * Gets the coordinates for a given city name by using Google's geocoder
   * @param cityName
   * @returns {Promise<any>}
   */
  getCityLocation = (cityName: string) => {

    const geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {

      geocoder.geocode({
        address: cityName
      }, (results, status) => {

        if (status === 'OK') {
          resolve(results[0].geometry.location);
        } else {
          reject();
        }

      });

    });

  };

  /**
   * Event handler for searching a city
   * @param city
   */
  onSearchCity = city => {
    this.setState({
      cityName: city
    });
  };

  /**
   * Event handler for setting found places into the state
   * @param places
   */
  handleSetPlaces = (places) => {

    this.setState({
      places
    });

  };

  /**
   * Convert an array of places into an array of Google Maps-compatible markers
   * @param places
   * @returns {Array}
   */
  getMarkersFromPlaces = (places: array) => {

    const markers = [];

    this.state.places.forEach(place => {

      const position = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      const marker = new google.maps.Marker({
        position,
        name: place.name,
        animation: place.animation,
        map: null
      });

      markers.push(marker);

    });

    return markers;

  };

  render() {

    return (
      <div className="app">
        <Header/>
        <CitySearch cityName={this.state.cityName} onSearchCity={this.onSearchCity}/>
        <div className="row main-container">
          <Sidebar places={this.state.places} />
          <MapContainer
            google={this.props.google}
            markers={this.getMarkersFromPlaces(this.state.places)}
            center={this.state.cityLatLong}
            setPlaces={this.handleSetPlaces}
          />
        </div>
      </div>
    );
  }

}

/**
 * Wrap our main component into the GoogleApiWrapper so Maps methods are available
 */
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAMss-ib4bIIBFQg2__-IzT4ic_AVvKR4I'
})(App);
