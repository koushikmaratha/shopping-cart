import { shallow } from 'enzyme';
import React from 'react';
import CartItem from './CartItem';

describe('CartItem', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CartItem
                        title='First Item'
                        quantity='1'
                        price='10'
                      />);
  });
  it('should have a p tag', () => {
    expect(wrapper.contains(<p>First Item</p>)).toBe(true);
  });
});
