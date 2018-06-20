// @flow
/* global google */

import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import CitySearch from './components/CitySearch/CitySearch';
import Header from './components/Header/Header';
import MapContainer from './components/MapContainer/MapContainer';
import Sidebar from './components/Sidebar/Sidebar';
import { GoogleApiWrapper } from 'google-maps-react';
import './App.css';

class App extends Component {

  state = {
    markerData: [
      { position: { lat: 43.3, lng: 11.3 } },
      { position: { lat: 43.32, lng: 11.28 } }
    ],
    cityName: 'Amsterdam'
  };

  async componentDidMount() {

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

  handleSetPlaces = (places) => {
    this.setState({ places });
  };

  render() {

    const markers = this.state.markerData.map((data, idx) => {
      return <Marker key={`marker_${idx}`} position={data.position} />;
    });

    return (
      <div className="app">
        <Header/>
        <CitySearch cityName={this.state.cityName} />
        <div className="row main-container">
          <Sidebar />
          <MapContainer
            google={this.props.google}
            markers={markers}
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
