// @flow

import React from 'react';
import './PlaceDetails.css';

const PlaceDetails = props => {

  return (
    <div id="place-details" className="d-none d-lg-block col-lg-5">
      <h3>{props.place.name}</h3>
      <h4>{props.place.categories[0].name}</h4>

      {props.place.description &&
      <div className="place-description">
        {props.place.description}
      </div>}

      {props.place.hours &&
      <div className="place-hours">{props.place.hours.status}</div>}

      {props.place.location.formattedAddress &&
      <div className="place-address">
        <div>{props.place.location.formattedAddress[0]}</div>
        <div>{props.place.location.formattedAddress[1]}</div>
        <div>{props.place.location.formattedAddress[2]}</div>
      </div>
      }

      {props.place.url && <div className="place-website">
        <a href={props.place.url} target="_blank">{props.place.url}</a>
      </div>}
    </div>
  );

};

export default PlaceDetails;
