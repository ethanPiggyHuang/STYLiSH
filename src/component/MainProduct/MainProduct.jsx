import React, { useState, useEffect } from 'react';
import Choice from './Choice';
import MoreInfo from './MoreInfo';
import './MainProduct.css';

const MainProduct = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const urlId = new URLSearchParams(window.location.search).get('id');

  useEffect(() => {
    fetch(`https://api.appworks-school.tw/api/1.0/products/details?id=${urlId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data))
      .then(() => setIsLoading(false));
    localStorage.getItem('EthanSTYLiSHCart') === null
      ? props.setCartOrders([])
      : props.setCartOrders(
          JSON.parse(localStorage.getItem('EthanSTYLiSHCart'))
        );
  }, []);

  if (isLoading) {
    return <div className="isloading">loading...</div>;
  }

  return (
    <div className="product-contain-outer">
      <div className="product-info-container">
        <img
          src={product.main_image}
          alt={`picture of ${product.title}`}
          className="product"
        />
        <div className="product-info">
          <p className="product-name">{product.title}</p>
          <p className="product-id">{product.id}</p>
          <p className="product-price">TWD.{product.price}</p>
          <div className="product-dividing-line" />
          <Choice
            cartOrders={props.cartOrders}
            setCartOrders={props.setCartOrders}
            product={product}
            setProduct={setProduct}
          />
          <div className="product-detail">
            <p>{product.note}</p>
            <br />
            <p>{product.texture}</p>
            {product.description.split(/[\r][\n]/).map((line, index) => (
              <p key={index}>{line}</p>
            ))}
            <br />
            <p>清洗：{product.wash}</p>
            <p>產地：{product.place}</p>
          </div>
        </div>
        <MoreInfo product={product} setProduct={setProduct} />
      </div>
    </div>
  );
};

export default MainProduct;
