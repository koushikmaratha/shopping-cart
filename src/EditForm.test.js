import React from 'react';
import EditForm from './EditForm';
import { shallow } from 'enzyme';

describe('EditForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EditForm 
        title="First Item"
        quantity="10"
        price="100"
      />)
  });

  //console.log(wrapper)

  describe('User populates the input', () => {
    const value1 = "Edited";
    const value2 = "11";
    const value3 = "101";
    let inputOne;
    let inputTwo;
    let inputThree;

    beforeEach(() => {
       inputOne = wrapper.find('input').first();
       inputTwo = wrapper.find('input')[1];
       inputThree = wrapper.find('input')[2];
       inputOne.simulate('change', {
        target: {value: "Edited", name: "title"}
      })
    })

    it("should update the state property 'title' ", () => { 
      expect(
        wrapper.state().fields.title
      ).toEqual(value1)
    })
  })

})