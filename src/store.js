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
		let cartItems = state.cartItems;
		let productData = state.productData;

		if (cartItems.find((item) => { // already exists in cart
			return item.id === action.value;
		})) {
			cartItems = cartItems.map((item) => {
				if (item.id === action.value){
					let newItem = Object.assign({}, item);
					newItem.quantity += 1
					return newItem
				} else {
					return item;
				}
			})

		} else { // does not yet exist in cart
			let newItem = Object.assign({}, productData.find((product) => {
				return product.id === action.value;
			}))
			newItem.quantity = 1;
			cartItems = [...state.cartItems, newItem]

		}

		productData = productData.map((product) => {
			if (product.id === action.value) {
				let newProduct = Object.assign({}, product);
				newProduct.quantity -= 1;
				return newProduct;
			} else {
				return product;
			}
		})

		return {
			productData: productData,
			cartItems: cartItems
		}

}

const removeFromCart = (state, action) => {
	let cartItems = state.cartItems;
	let productData = state.productData;
	let quantityToAddBack;

	cartItems = cartItems.filter((item) => {
		if (item.id !== action.value){
			return true;
		} else {
			quantityToAddBack = item.quantity;
		}
	})

	productData = productData.map((product) => {
		if (product.id === action.value){
			let temp = Object.assign({}, product);
			temp.quantity += quantityToAddBack;
			return temp;
		} else {
			return product;
		}
	})

	return {
			productData: productData,
			cartItems: cartItems
	}

}

const reducer = (state, action) => {
	if (action.type === "ADD_TO_CART") {
		state = addToCart(state, action);
	}
	if (action.type === "REMOVE_FROM_CART") {
		state = removeFromCart(state, action);
	}
  //delete product
  //edit product
  //add product
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