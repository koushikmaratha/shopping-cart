import React, { Component } from 'react';

class CartItem extends Component {
  constructor(props) {
    super(props);

    this.removeFromCart = this.removeFromCart.bind(this);
  }
  removeFromCart(e) {
    e.preventDefault();
    this.props.removeFromCart(this.props.id);
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
