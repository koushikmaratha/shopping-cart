import React, { Component } from 'react';

import CartItem from './CartItem';

class CartItemList extends Component {
  totalPrice = () => {
    return this.props.cartItems.reduce((acc, item) => {
      acc += item.price * item.quantity;
      return acc;
    }, 0);
  }
  render() {
    // eslint complains about unexpected block statement around arrow body
    const cartItems = this.props.cartItems.map((item) => {
      return (
        <CartItem
          key={`${item}-${item.id}`}
          id={item.id}
          title={item.title}
          price={item.price}
          quantity={item.quantity}
          removeFromCart={this.props.removeFromCart}
        />
      );
    });

    return (
      <div>
        <h3>Cart</h3>
        {cartItems}
        <div>
         Total: ${(this.totalPrice()).toFixed(2)}
        </div>
      </div>
    );
  }
}

export default CartItemList
