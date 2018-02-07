import React, { Component } from 'react';

import ProductList from './ProductList';

class ProductManager extends Component {
  render () {
    return (
      <ProductList productData={this.props.productData}
                   addToCart={this.props.addToCart}
                   deleteProduct={this.props.deleteProduct}
                   editProduct={this.props.editProduct}
      />
    );
  }
}

export default ProductManager;
