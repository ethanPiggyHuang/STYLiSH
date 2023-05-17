import React from 'react';
import Navigation from './Navigation';
import MediaSite from './MediaSite';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <Navigation />
      <MediaSite />
      <p className="copyright">&copy;2018. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
