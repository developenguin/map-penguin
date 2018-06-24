// @flow

import React from 'react';
import './PlaceDetails.css';

const PlaceDetails = props => {

  return (
    <div id="item-details" className="d-none d-lg-block col-lg-5">
      <h3>{props.place.name}</h3>
      <h4>{props.place.categories[0].name}</h4>
    </div>
  );

};

export default PlaceDetails;
