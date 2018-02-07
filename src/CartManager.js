import React, { Component } from 'react';

import CartItemList from './CartItemList';

class CartManager extends Component {
  checkout = (e) => {
    e.preventDefault();
    this.props.checkout();
  }
  render() {
    return (
      <div>
        <CartItemList removeFromCart={this.props.removeFromCart}
                      cartItems={this.props.cartItems}/>
        <button className="button" onClick={this.checkout}>Check Out </button>
    </div>
    )
  }
}

export default CartManager;
