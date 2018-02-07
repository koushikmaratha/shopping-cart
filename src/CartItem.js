import React, { Component } from 'react';

class CartItem extends Component {
  removeFromCart = (e) => {
    e.preventDefault();
    this.props.removeFromCart(this.props.id)
  }
  render() {
    return (
      <div className="cart">
        <p>{this.props.title}</p>
        <button className="button" onClick={this.removeFromCart}>Remove </button>
      </div>
    );
  }
}

export default CartItem
