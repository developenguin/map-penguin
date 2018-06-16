import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import mapStyles from './MapStyles';

const MapContainer = withScriptjs(withGoogleMap((props) => {

  const options = {
    styles: mapStyles
  };

  return (
    <GoogleMap options={options} defaultZoom={16} defaultCenter={{ lat: 43.3175083, lng: 11.3305885 }}>
      {props.markers}
    </GoogleMap>
  );

}));

export default MapContainer;
