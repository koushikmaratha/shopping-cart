import React, { Component } from 'react';
import { shallow } from 'enzyme';

import ProductList from './ProductList';
import ProductManager from './ProductManager';

describe('ProductManager', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ProductManager />);
  });
  it('renders a product list component', () => {
    expect(wrapper.contains(<ProductList />)).toBe(true);
  });
});
