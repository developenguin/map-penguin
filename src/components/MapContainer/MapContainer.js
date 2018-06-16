import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapContainer = withScriptjs(withGoogleMap((props) => {

  return (
    <GoogleMap clickableIcons={false} defaultZoom={16} defaultCenter={{ lat: 43.3175083, lng: 11.3305885 }}>
      {props.markers}
    </GoogleMap>
  );

}));

export default MapContainer;
