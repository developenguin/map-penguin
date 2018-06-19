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
      minHeight: '500px'
    };

    return (
      <div ref="map" className="col-sm-12 col-md-9 col-xl-10" style={style}>
        loading map...
      </div>
    );

  }
}
