import { shallow, mount } from 'enzyme';

import React from 'react';
import CartItem from './CartItem';
import CartItemList from './CartItemList';

describe('CartItemList', () => {
  const ipadCartItem = (
    <CartItem
      id={2}
      title="Apple 10.5-Inch iPad Pro"
      quantity={3}
      price={649.99}
    />);

  const cartItems = [
    {
      id: 2,
      title: 'Apple 10.5-Inch iPad Pro',
      quantity: 3,
      price: 649.99,
    },
    {
      id: 1,
      title: 'Amazon Kindle E-reader',
      quantity: 5,
      price: 79.99,
    },
  ];
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<CartItemList
      cartItems={cartItems}
    />);
  });
  it('to contain cart item', () => {
    expect(wrapper.containsMatchingElement(ipadCartItem)).toBe(true);

    const cartItemsRendered = wrapper.find(CartItem);
    expect(cartItemsRendered.length).toEqual(2);
  });
});
