import productData from './productData';

function createStore(reducer, initialState) {
	let state = initialState;
	let listeners = [];

	const getState = () => (state);
	const dispatch = (action) => {
	    state = reducer(state, action);
	    listeners.forEach(func => func())
	  };

	const subscribe = (listener) => (listeners.push(listener))

	return {
		getState,
		dispatch,
		subscribe
	}
}

const addToCart = (state, action) => {
	let newItem;
	let newCartItems;
	//check cartItems
		// if it doesn't have product with action.vale
			// find product with action.value (which is id) in productData
			// if its quantity is 0, do nothing
			// otherwise decrement its qty, make a copy of it
			// increment the copy's quantity
			// insert into cart Items
		// otherwise increment qty in cartItems

	if (state.cartItems.filter((item) => (item.id === action.value)).length) {
		newCartItems = state.cartItems.map((item) => {
			if (item.id === action.value) {
				newItem = Object.assign({}, item);
				newItem.quantity += 1;
				return newItem;
			} else {
				return item;
			}
		})

		return state.cartItems.concat(newCartItems);
	} else {
		newItem = state.productData.filter((product) => {
			return product.id === action.value;
		})
		newItem[0] = Object.assign({}, newItem[0])
		newItem[0].quantity = 1;
		return state.cartItems.concat(newItem);
	}

}

const reducer = (state, action) => {
	if (action.type === "ADD_TO_CART") {
		state = {...state, cartItems:  addToCart(state, action)}
	}
  //delete product
  //edit product
  //add to cart
  //remove from cart
  //checkout
  return state;
}

const initialState = {
	productData: productData,
	cartItems: []
}

const store = createStore(reducer, initialState)


export default store