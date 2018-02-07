import React, { Component } from 'react';

import CartItem from './CartItem';

class CartItemList extends Component {
  totalPrice = () => {
    return this.props.cartItems.reduce((accumulator, item) => {
      return accumulator += item.price * item.quantity;
    }, 0);
  }
  render() {
    let cartItems = this.props.cartItems.map((item, index) => {
      return <CartItem key={item + '-' + index}
                       id={item.id}
                       title={item.title}
                       price={item.price}
                       quantity={item.quantity}
                       removeFromCart={this.props.removeFromCart}
              />
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
