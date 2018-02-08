import { shallow } from 'enzyme';
import React from 'react';
import Form from './Form';

describe('Form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Form
        title=""
        price=""
        quantity=""
      />
    );

    wrapper.setState({ displayed: true });
  });

  it('should have the `h3` "Add Product"', () => {
    expect(
      wrapper.contains(<h3>Add Product</h3>)
    ).toBe(true);
  });

  it('should have a `cancel button` element', () => {
    expect(
      wrapper.containsMatchingElement(
        <button>Cancel</button>
      )
    ).toBe(true);
  });

  it('should have `input` element', () => {
    expect(
      wrapper.containsMatchingElement(
        <input />
      )
    ).toBe(true);
  });

  describe('the user populates the input', () => {
    const title_value = 'Mac';
    const price_value = '1500';
    const quantity_value = '1';

    beforeEach(() => {
      const inputOne = wrapper.find('input').first();
      const inputTwo = wrapper.find("input[name='price']");
      const inputThree = wrapper.find("input[name='quantity']");
      inputOne.simulate('change', {
        target: { value: title_value, name: "title"}
      });
      inputTwo.simulate('change', {
        target: { value: price_value, name: "price"}
      });
      inputThree.simulate('change', {
        target: { value: quantity_value, name: "quantity"}
      });
    });

    it('should update the state fields `title`', () => {
      expect(
        wrapper.state().fields.title
      ).toEqual(title_value);
    });

    it('should update the state fields `price`', () => {
      expect(
        wrapper.state().fields.price
      ).toEqual(price_value);
    });

    it('should update the state fields `quantity`', () => {
      expect(
        wrapper.state().fields.quantity
      ).toEqual(quantity_value);
    });

    // describe('and then submits the form', () => {
    //   beforeEach(() => {
    //     const form = wrapper.find('form').first();
    //     form.simulate('submit', {
    //       preventDefault: () => {},
    //     });
    //   });
    //
    //   it('should add the product to state', () => {
    //     expect(
    //       wrapper.state().fields
    //     ).toContain();
    //   });
    // });
  });
});
