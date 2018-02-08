import { shallow } from 'enzyme';
import React from 'react';
import ShoppingManager from './ShoppingManager';
import CartManager from './CartManager';
import ProductManager from './ProductManager';
import productData from './productData';

describe('ShoppingManager', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ShoppingManager
      />
    );

    wrapper.setState({ productData, cartItems: []});
  });

  it('should have the `h1`', () => {
    expect(
      wrapper.contains(<h1>Welcome to the Shop!</h1>)
    ).toBe(true);
  });

  it('renders the <ProductManager /> component', () => {
    expect(wrapper.find(ProductManager));
  });

  it('renders the <CartManager /> component', () => {
    expect(wrapper.find(CartManager));
  });

});
