import React from 'react';
import './Navigation.css';

const Navigation = () => {
  return (
    <ul className="navigation-container">
      <li className="navigation navigation-fisrt-collumn">關於 STYLiSH</li>
      <li className="navigation navigation-fisrt-collumn">服務條款</li>
      <li className="navigation navigation-fisrt-collumn">隱私政策</li>
      <li className="navigation navigation-second-collumn">聯絡我們</li>
      <li className="navigation navigation-second-collumn">FAQ</li>
    </ul>
  );
};

export default Navigation;
