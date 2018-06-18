// @flow

import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import CitySearch from './components/CitySearch/CitySearch';
import Header from './components/Header/Header';
import MapContainer from './components/MapContainer/MapContainer';
import Sidebar from './components/Sidebar/Sidebar';
import { apiKey, GoogleMapsClient } from './services/GoogleClient';
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

    const cityLatLong = await this.getCityLocation(this.state.cityName);

    this.setState({
      cityLatLong
    });

  }

  getCityLocation = (cityName: string) => {

    return GoogleMapsClient.geocode({
      address: cityName
    }).asPromise()
      .then(response => {
        return response.json.results[0].geometry.location;
      });

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
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div className="map-container col pl-0" />}
            mapElement={<div style={{ height: '100%' }} />}
            markers={markers}
            cityLatLong={this.state.cityLatLong}
          />
        </div>
      </div>
    );
  }

}

export default App;
