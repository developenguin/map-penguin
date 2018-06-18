import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import mapStyles from './MapStyles';

const MapContainer = withScriptjs(withGoogleMap((props) => {

  const options = {
    styles: mapStyles
  };

  return (
    <GoogleMap options={options} defaultZoom={15} defaultCenter={props.cityLatLong}>
      {props.markers}
    </GoogleMap>
  );

}));

export default MapContainer;
