import React from 'react';
import './MoreInfo.css';

const MoreInfo = (props) => {
  return (
    <div className="more-info-container">
      <p className="more-info-title">更多產品資訊</p>
      <div className="more-info-dividing-line" />
      <p className="more-info-text">{props.product.story}</p>
      {props.product.images.map((image, index) => (
        <img
          src={image}
          alt="product sample"
          className="product-sample"
          key={index}
          index={index}
        />
      ))}
    </div>
  );
};

export default MoreInfo;
