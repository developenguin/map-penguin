// @flow

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

    const cityLatLong = await this.getCityLocation(this.state.cityName),
          places = await this.getPlacesNearLatLong(cityLatLong);

    this.setState({
      cityLatLong,
      places
    });

  }

  getCityLocation = (cityName: string) => {

    //return GoogleMapsClient.geocode({
    //  address: cityName
    //}).asPromise()
    //  .then(response => {
    //    return response.json.results[0].geometry.location;
    //  });

  };

  getPlacesNearLatLong = (latLong: object) => {

    //return GoogleMapsClient.placesNearby({
    //  type: 'poi',
    //  language: 'en',
    //  radius: 5000,
    //  location: [latLong.lat, latLong.lng]
    //}).asPromise()
    //  .then(response => {
    //    return response.json.results;
    //  })

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
            center={{ lat: 43.33, lng: 11.32}}
          />
        </div>
      </div>
    );
  }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAMss-ib4bIIBFQg2__-IzT4ic_AVvKR4I'
})(App);
