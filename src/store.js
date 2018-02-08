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

const reducer = (state, action) => {
	if (action.type === "ADD_TO_CART") {
		state = {...state, cartItems: state.cartItems.concat(action.value)}
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