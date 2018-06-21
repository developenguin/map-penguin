import React from 'react';
import './PlaceItem.css';

const PlaceItem = props => {

  return (
    <div className="place-item px-1 py-2">{props.name}</div>
  );

};

export default PlaceItem;
