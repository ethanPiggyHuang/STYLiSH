import React from 'react';
import './MediaSite.css';
import lineImg from '../../img/line.png';
import twitterImg from '../../img/twitter.png';
import facebookImg from '../../img/facebook.png';

const MediaSite = () => {
  return (
    <div className="media-sites">
      <img src={lineImg} alt="line" className="media-site" />
      <img src={twitterImg} alt="twitter" className="media-site" />
      <img src={facebookImg} alt="facebook" className="media-site" />
    </div>
  );
};

export default MediaSite;
