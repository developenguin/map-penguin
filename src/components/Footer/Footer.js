import React from 'react';
import './Footer.css';

const Footer = props => {

  return (
    <footer className="row">
      <div className="col d-flex justify-content-center my-3">
        Developenguin, 2018 | Maps by<a className="mx-2" href="www.google.com">Google</a>| Location data provided by <a className="mx-2" href="www.foursquare.com">Foursquare</a>
      </div>
    </footer>
  );

};

export default Footer;
