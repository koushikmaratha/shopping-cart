import React, { Component } from 'react';

import ProductList from './ProductList';
import Form from './Form';

class ProductManager extends Component {
  render () {
    return (
      <div>
        <ProductList productData={this.props.productData}
                     addToCart={this.props.addToCart}
                     deleteProduct={this.props.deleteProduct}
                     editProduct={this.props.editProduct}
        />
        <Form
          addProduct={this.props.addProduct}
        />
      </div>
    );
  }
}

export default ProductManager;
