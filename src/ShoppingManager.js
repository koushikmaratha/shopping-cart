import React, { Component } from 'react';

import CartManager from './CartManager';
import ProductManager from './ProductManager';
import productData from './productData';
import store from './store'
import logo from './logo.svg';
import './App.css';


class ShoppingManager extends Component {
  

  componentWillMount() {
    store.subscribe(() => {this.forceUpdate()})
  }

  render() {
    const products = store.getState().productData;
    
    const cartItems = store.getState().cartItems;
    return (
    <main>
      <header className="header">
        <h1>Welcome to the Shop!</h1>
      </header>
      <ProductManager
        productData={products}
      />

      <CartManager
        cartItems={cartItems}
      />
    </main>
    );
  }
}

export default ShoppingManager;
