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

    wrapper.setState({ productData: productData, cartItems: []});
  });

  it('should have the `h1`', () => {
    expect(
      wrapper.contains(<h1>Welcome to the Shop!</h1>)
    ).toBe(true);
  });

  it('renders the <ProductManager /> component', () => {
    expect(wrapper.find(ProductManager)).toHaveLength(1);
  });

  it('renders the <CartManager /> component', () => {
    expect(wrapper.find(CartManager)).toHaveLength(1);
  });

  it('returns the last product id when called lastID', () => {
    const lastID = productData[productData.length-1].id;
    expect(lastID).toEqual(4);
  });

  it ('removes deleted product from the productData', () => {
    const id = 1;
    const updatedProducts = wrapper.state().productData.filter(product => product.id !== id);
    wrapper.setState({ productData: updatedProducts});
    expect(wrapper.state().productData).toHaveLength(3);
  });

  it ('adds product to the productData', () => {
    const newProduct = {title: "First", price: "100", quantity: "1"};
    const updatedProducts = [...wrapper.state().productData, newProduct];
    wrapper.setState({ productData: updatedProducts});
    expect(wrapper.state().productData).toHaveLength(5);
  });

  it ('edits product info and update the productData', () => {
    const updatedProductOne = {title: "First", price: "100", quantity: "1", id: "1"};
    const updatedProducts = wrapper.state().productData.map((product) => {
      if (product.id === updatedProductOne.id) { return updatedProductOne; }
      return product;
    });
    wrapper.setState({ productData: updatedProducts});
    expect(wrapper.state().productData).toBe(updatedProducts);
  });

  it ('adds product to Cart', () => {
    const prevQuan = productData[0].quantity;
    const toAddToCart = productData[0];
    const updatedProducts = wrapper.state().productData.map((product) => {
      if (product.id === toAddToCart.id) {
        const newProduct = Object.assign({}, product);
        newProduct.quantity -= 1;
        return newProduct;
      }
      return product;
    });
    const cartItems = wrapper.state().cartItems.concat(toAddToCart);
    wrapper.setState({productData: updatedProducts, cartItems,});
    expect(wrapper.state().cartItems).toHaveLength(1);
    expect(wrapper.state().productData[0].quantity).toEqual(prevQuan-1);
  });
});
