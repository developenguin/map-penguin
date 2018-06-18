import React from 'react';
import './CitySearch.css';

const CitySearch = props => {

  return (
    <div className="row city-search-row">
      <div className="col d-flex justify-content-center my-3">
        <h2 className="mx-3">Exploring</h2>
        <input className="px-3" type="text" id="city-input" defaultValue={props.cityName} />
      </div>
    </div>
  );

};

export default CitySearch;
