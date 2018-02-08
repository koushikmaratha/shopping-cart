import { shallow } from 'enzyme';
import sinon from 'sinon';

import React from 'react';
import CartItem from './CartItem';

describe('CartItem', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CartItem
      title="First Item"
      quantity="1"
      price="10"
    />);
  });
  it('should be able to display props', () => {
    expect(wrapper.contains(<p>First Item - 10 x 1</p>)).toBe(true);
  });

  it('should call the remove method when clicked', () => {
    const removeStub = sinon.stub(CartItem.prototype, 'removeFromCart');
    const rendered = shallow(<CartItem />);

    rendered.find('.remove').simulate('click');

    expect(removeStub.calledOnce).toBe(true);
  });
});
