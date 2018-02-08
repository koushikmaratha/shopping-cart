import React from 'react';
import Product from './EditForm';
import sinon from 'sinon';
import { shallow } from 'enzyme';


describe('Product', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Product 
					title="Test Product"
					price="100"
					quantity="10"
			/>)
	})

	it("should have a button element", () => {
		expect(
			wrapper.find('button').exists()
		).toBe(true)
	})

	describe('Product renders form', () => {
		beforeEach(()=> {
			wrapper.setState({formDisplayed: true})
		})

		it("should show form", () => {
			expect(
				wrapper.find('button').exists()
			).toBe(true)
		})

		it("should have input elements", () => {
			expect(
				wrapper.find('form').find('input').exists()
			).toBe(true)
		})
	})


}) 