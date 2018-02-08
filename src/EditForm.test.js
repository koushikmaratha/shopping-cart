import React from 'react';
import EditForm from './EditForm';
import sinon from 'sinon';
import { shallow } from 'enzyme';

describe('EditForm', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<EditForm 
        title="First Item"
        quantity="10"
        price="100"
        id={1}
      />)
    instance = wrapper.instance();
  });

  //console.log(wrapper)

  describe('User changes the input', () => {
    const value1 = "Edited";
    const value2 = "101";
    const value3 = "11";
    let inputOne;
    let inputTwo;
    let inputThree;

    beforeEach(() => {
       inputOne = wrapper.find('input').first();
       inputTwo = wrapper.find("input[name='price']");
       inputThree = wrapper.find("input[name='quantity']");
       inputOne.simulate('change', {
        target: {value: value1, name: "title"}
      })
       inputTwo.simulate('change', {
        target: {value: value2, name: "price"}
       })
       inputThree.simulate('change', {
        target: {value: value3, name: "quantity"}
       })
      
    })

    it("should update the state property 'title' ", () => { 
      expect(
        wrapper.state().fields.title
      ).toEqual(value1)
    })

    it("should update the state property 'price' ", () => { 
      expect(
        wrapper.state().fields.price
      ).toEqual(value2)
    })

    it("should update the state property 'quantity' ", () => { 
      expect(
        wrapper.state().fields.quantity
      ).toEqual(value3)
    })
  })
/*
  describe("then submits the form", () => {
    let form;
    let spy;
    let handleSubmitStub;
    let stub;
   


    beforeEach(() => {
      spy = sinon.spy();
      handleSubmitStub = sinon.stub(instance, "handleSubmit").callsFake((spy))
      console.log(instance)
      form = wrapper.find('form').first()
    
      form.simulate('submit', {
        preventDefault: () => {},
      })
     
    });

    it("should fire handleSubmit", () => {
      sinon.assert.calledOnce(spy)
    })
  })
*/


})