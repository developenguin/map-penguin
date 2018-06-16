/* @flow */

import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import Header from './components/Header/Header';
import MapContainer from './components/MapContainer/MapContainer';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      markerData: [
        { position: { lat: 43.3, lng: 11.3 } },
        { position: { lat: 43.32, lng: 11.28 } }
      ]
    };
  }

  render() {

    const markers = this.state.markerData.map((data, idx) => {
      return <Marker key={`marker_${idx}`} position={data.position} />;
    });

    return (
      <div className="app">
        <Header/>
        <div className="row main-container">
          <Sidebar />
          <MapContainer
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAMss-ib4bIIBFQg2__-IzT4ic_AVvKR4I&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div className="map-container col pl-0" />}
            mapElement={<div style={{ height: '100%' }} />}
            markers={markers}
          />
        </div>
      </div>
    );
  }

}

export default App;
