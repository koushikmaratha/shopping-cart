import { shallow, mount } from 'enzyme';

import React from 'react';
import CartItem from './CartItem';
import CartItemList from './CartItemList';

describe('CartItemList', () => {
  // would prefer to test this, since this the contract of the component to
  // generate this
  const result = (
    <CartItem id="2"
      title="Apple 10.5-Inch iPad Pro"
      quantity="3"
      price="649.99"
    />);

  const cartItems = [{
    id: 2,
    title: 'Apple 10.5-Inch iPad Pro',
    quantity: 3,
    price: 649.99,
  }];
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<CartItemList
      cartItems={cartItems}
    />);
  });
  it('to contain cart item', () => {
    // expect(wrapper.containsMatchingElement(result)).toBe(true);
    
    // Is this too similar to the UI test on CartItem?
    expect(wrapper.find('.cart').text()).toContain('Apple 10.5-Inch iPad Pro - 649.99 x 3');
  });
});
