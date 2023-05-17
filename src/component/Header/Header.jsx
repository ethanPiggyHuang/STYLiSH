import React from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
import SearchBar from './SearchBar';
import User from './User';
import './Header.css';
import logo from '../../img/logo.png';

const Header = (props) => {
  return (
    <header>
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="STYILiSH logo" className="logo" />
        </Link>
      </div>
      <div className="dividing-line" />
      <Category />
      <SearchBar />
      <User cartOrders={props.cartOrders} />
    </header>
  );
};

export default Header;
