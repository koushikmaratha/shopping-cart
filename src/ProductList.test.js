import { shallow } from 'enzyme';
import React from 'react';
import ProductList from './ProductList';
import Product from './Product';
import productData from './productData';

describe('ProductList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProductList
                        productData={productData}
                      />);
  });

  it ('renders Four <Product /> component', () => {
    expect(wrapper.find(Product)).toHaveLength(4);
  });

});
