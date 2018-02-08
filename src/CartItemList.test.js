import { shallow } from 'enzyme';

import React from 'react';
import CartItem from './CartItem';
import CartItemList from './CartItemList';

describe('CartItemList', () => {
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
    wrapper = shallow(<CartItemList
      cartItems={cartItems}
    />);
  });
  it('to contain cart item', () => {
    expect(wrapper.containsMatchingElement(result)).toBe(true);
    // expect(wrapper.contains(result).toBe(true));
    // expect(wrapper.contains(result));
    // expect(wrapper).toBe(true)
  });
});
