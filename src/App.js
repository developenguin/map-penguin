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
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.cityName !== prevState.cityName) {
      this.loadMap();
    }

  }

  async loadMap() {
    const location = await this.getCityLocation(this.state.cityName);

    this.setState({
      cityLatLong: { lat: location.lat(), lng: location.lng() }
    });

  }

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

  onSearchCity = city => {
    this.setState({
      cityName: city
    });
  };

  handleSetPlaces = (places) => {
    this.setState({ places });
  };

  render() {

    return (
      <div className="app">
        <Header/>
        <CitySearch cityName={this.state.cityName} onSearchCity={this.onSearchCity}/>
        <div className="row main-container">
          <Sidebar />
          <MapContainer
            google={this.props.google}
            places={this.state.places}
            center={this.state.cityLatLong}
            setPlaces={this.handleSetPlaces}
          />
        </div>
      </div>
    );
  }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAMss-ib4bIIBFQg2__-IzT4ic_AVvKR4I'
})(App);
