import React, { Component } from 'react';
import Header from './components/Header/Header';
import MapContainer from './components/MapContainer/MapContainer';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

class App extends Component {

  render() {
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
          />
        </div>
      </div>
    );
  }

}

export default App;
