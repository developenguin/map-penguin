import React from 'react';
import './Footer.css';

const Footer = props => {

  return (
    <footer className="p-3 w-100 justify-content-center">
      Developenguin, 2018 | Maps by<a className="mx-2" href="www.google.com">Google</a>| Location data provided by <a className="mx-2" href="www.foursquare.com">Foursquare</a>
    </footer>
  );

};

export default Footer;
