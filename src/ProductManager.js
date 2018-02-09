import React, { Component } from 'react';

import ProductList from './ProductList';
import Form from './Form';

class ProductManager extends Component {
  render() {
    return (
      <div>
        <ProductList
          productData={this.props.productData}
          deleteProduct={this.props.deleteProduct}
          editProduct={this.props.editProduct}
        />
        <Form
        />
      </div>
    );
  }
}

export default ProductManager;
