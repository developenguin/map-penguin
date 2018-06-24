// @flow

import React from 'react';
import './PlaceDetails.css';
import FoursquareService from '../../services/FoursquareService';

const PlaceDetails = props => {

  const place = props.place,
        photo = place.photos.groups[0].items[0];

  return (
    <div id="place-details" className="col-sm-12 col-md-8 col-lg-5 mt-md-3">

      <div className="place-image">
        <img className="w-100" src={FoursquareService.getPhotoUrlForPhoto(photo)} alt={place.name} />
      </div>

      <div className="place-heading">
        <h3>{place.name}</h3>
        <h4>{place.categories[0].name}</h4>
      </div>

      {place.description &&
      <div className="place-description mt-2">
        {place.description}
      </div>}

      {place.hours &&
      <div className="place-hours mt-2">{place.hours.status}</div>}

      {place.location.formattedAddress &&
      <div className="place-address mt-2">
        <div>{place.location.formattedAddress[0]}</div>
        <div>{place.location.formattedAddress[1]}</div>
        <div>{place.location.formattedAddress[2]}</div>
      </div>
      }

      {place.url && <div className="place-website mt-2">
        <span>Website: </span><a href={place.url} target="_blank">{place.url}</a>
      </div>}
    </div>
  );

};

export default PlaceDetails;
