import React, { Component } from 'react';
import EditForm from './EditForm';
import store from './store'

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formDisplayed: false
    }
  }

  showForm = () => {
    this.setState({
      formDisplayed: true
    })
  }

  handleAddToCartClick = (e) => {
    e.preventDefault();
    if (this.props.quantity > 0){
      store.dispatch({
        type: "ADD_TO_CART",
        value: this.props.id
      })
    };
  }

  handleProductDeletion = (e) => {
    e.preventDefault();
    store.dispatch({
      type: "DELETE_PRODUCT",
      value: this.props.id
    })
  }

  showProduct = () => {
    this.setState({
      formDisplayed: false,
    });
  }

  render() {
    if (this.state.formDisplayed) {
     return (
        <EditForm
          title={this.props.title}
          price={this.props.price}
          quantity={this.props.quantity}
          id={this.props.id}
          editProduct={this.props.editProduct}
          cancelEdit={this.showProduct}
        />
      )
    } else {
      return (
        <div className="product">
          <p>{this.props.title} - ${this.props.price} x {this.props.quantity} <button onClick={this.handleProductDeletion}>X</button></p>
          <button className="button" onClick={this.handleAddToCartClick}>Add to cart</button>
          <button className="button" onClick={this.showForm}> Edit</button>
        </div>
      );
    }

  }
}

export default Product;
