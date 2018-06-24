// @flow

import React from 'react';
import './PlaceDetails.css';
import FoursquareService from '../../services/FoursquareService';

const PlaceDetails = props => {

  const photo = props.place.photos.groups[0].items[0];

  return (
    <div id="place-details" className="col-sm-12 col-md-8 col-lg-5 mt-md-3">

      <div className="place-image">
        <img className="w-100" src={FoursquareService.getPhotoUrlForPhoto(photo)} alt={props.place.name} />
      </div>

      <div className="place-heading">
        <h3>{props.place.name}</h3>
        <h4>{props.place.categories[0].name}</h4>
      </div>

      {props.place.description &&
      <div className="place-description mt-2">
        {props.place.description}
      </div>}

      {props.place.hours &&
      <div className="place-hours mt-2">{props.place.hours.status}</div>}

      {props.place.location.formattedAddress &&
      <div className="place-address mt-2">
        <div>{props.place.location.formattedAddress[0]}</div>
        <div>{props.place.location.formattedAddress[1]}</div>
        <div>{props.place.location.formattedAddress[2]}</div>
      </div>
      }

      {props.place.url && <div className="place-website mt-2">
        <span>Website: </span><a href={props.place.url} target="_blank">{props.place.url}</a>
      </div>}
    </div>
  );

};

export default PlaceDetails;
