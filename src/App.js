// @flow
/* global google */

import React, { Component } from 'react';
import CitySearch from './components/CitySearch/CitySearch';
import Header from './components/Header/Header';
import MapContainer from './components/MapContainer/MapContainer';
import Sidebar from './components/Sidebar/Sidebar';
import { GoogleApiWrapper } from 'google-maps-react';
import './App.css';
import FoursquareService from './services/FoursquareService';

class App extends Component {

  state = {
    places: [],
    cityName: 'Amsterdam',
    cityLatLong: {}
  };

  componentDidMount() {
    this.getMapDataForCityName();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (this.state.cityName !== prevState.cityName) {
      this.getMapDataForCityName();
    }

  }

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
   * Event handler for when the user clicks a sidebar item
   * Sets the corresponding place to clicked
   * @param item
   */
  onClickSidebarItem = item => {

    const otherPlaces = this.state.places
      .filter(place => {
        return place.id !== item.id;
      })
      .map(place => {
        place.isActive = false;
        return place;
      }),
      clickedPlace = {
        ...item,
        isActive: true
      };

    this.setState({
      places: [clickedPlace, ...otherPlaces]
    });

  };

  /**
   * Event handler for filtering locations from the sidebar
   * @param value
   */
  onFilterLocations = (value) => {

    const filteredPlaces = this.state.places.map(place => {

      place.isVisible = place.name.toLowerCase().includes(value.toLowerCase());
      return place;

    });

    this.setState({
      places: filteredPlaces
    });

  };

  /**
   * Gets the data needed to create the markers
   */
  getMapDataForCityName() {

    this.getCityLocation(this.state.cityName)
      .then(latLong => {

        this.setState({
          cityLatLong: { lat: latLong.lat(), lng: latLong.lng() }
        });

        return this.getPlacesNearLatLong(latLong)

      })
      .then((places) => {

        this.setState({
          places: places.map(place => {
            place.isVisible = true;
            return place;
          })
        });

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
   * Get places near the given location from Foursquare
   * @param latLong
   */
  getPlacesNearLatLong = latLong => {

    return FoursquareService.searchPlacesNearLocation({ lat: latLong.lat(), lng: latLong.lng() })
      .then(data => {
        return data.response.venues;
      });

  };

  render() {

    return (
      <div className="app">
        <Header/>
        <CitySearch cityName={this.state.cityName} onSearchCity={this.onSearchCity}/>
        <div className="row main-container">
          <Sidebar
            places={this.state.places}
            onClickItem={this.onClickSidebarItem}
            onFilterLocations={this.onFilterLocations}
          />
          <MapContainer
            google={this.props.google}
            center={this.state.cityLatLong}
            places={this.state.places}
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
