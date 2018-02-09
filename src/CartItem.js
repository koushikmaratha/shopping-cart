import React, { Component } from 'react';
import store from './store'

class CartItem extends Component {
  constructor(props) {
    super(props);

    this.removeFromCart = this.removeFromCart.bind(this);
  }
  removeFromCart(e) {
    e.preventDefault();
    store.dispatch({
      type: "REMOVE_FROM_CART",
      value: this.props.id
    })
  }
  render() {
    return (
      <div className="cart">
        <p>{this.props.title} - {this.props.price} x {this.props.quantity}</p>
        <button className="button remove" onClick={this.removeFromCart}>Remove </button>
      </div>
    );
  }
}

export default CartItem
