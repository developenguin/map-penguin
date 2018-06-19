import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapStyles from './MapStyles';

export default class MapContainer extends Component {

  componentDidUpdate() {
    this.loadMap();
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

  render() {

    const style = {
      width: '100%',
      minHeight: '500px'
    };

    return (
      <div ref="map" style={style}>
        loading map...
      </div>
    );

  }
}
