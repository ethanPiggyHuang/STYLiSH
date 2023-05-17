import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './normalize.css';
import Header from './component/Header/Header';
import RedirectIndex from './component/utils/RedirectIndex';
import MainProduct from './component/MainProduct/MainProduct';
import MainCheckout from './component/MainCheckout/MainCheckout';
import Footer from './component/Footer/Footer';

function App() {
  const [cartOrders, setCartOrders] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header cartOrders={cartOrders} />
        <Routes>
          <Route path="/" element={<RedirectIndex />} />
          <Route
            path="/product"
            element={
              <MainProduct
                cartOrders={cartOrders}
                setCartOrders={setCartOrders}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <MainCheckout
                cartOrders={cartOrders}
                setCartOrders={setCartOrders}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
