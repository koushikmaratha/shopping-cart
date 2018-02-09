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

const deleteProductFrom = (collection, id) => { // returns new collection w/ object removed
	return collection.filter((obj) => {
		return obj.id !== id;
	})
}

const addProductTo = (collection, productInfo) => { // returns new collection w/ object added
	collection.push({
		title: productInfo.title,
		price: productInfo.price,
		quantity: productInfo.quantity,
	})
	return collection;
}

const editProduct = (products, productInfo) => {
	console.log(productInfo)
	products = products.map((product) => {
		if (product.id === productInfo.newInfo.id) {
			let newProduct = { title: productInfo.newInfo.title, 
												 price: productInfo.newInfo.price,
												 quantity: productInfo.newInfo.quantity,
												 id: productInfo.newInfo.id };
			return newProduct;
		} else {
			return product;
		}
	})
	return products;
}

const reducer = (state, action) => {
	if (action.type === "ADD_TO_CART") {
		state = addToCart(state, action); // method returns an entirely new state
	}
	if (action.type === "REMOVE_FROM_CART") {
		state = removeFromCart(state, action);
	}
	if (action.type === "CHECKOUT") {
		state.cartItems = [] // method mutates the state by replacing it with a new collection
	}
	if (action.type === "DELETE_PRODUCT") {
		let products = deleteProductFrom(state.productData.slice(), action.value) // method is given less info
		let cartItems = deleteProductFrom(state.cartItems.slice(), action.value)// and returns a new collection
		state = {productData: products, cartItems: cartItems} // the entire state object is replaced
	}
	if (action.type === "ADD_PRODUCT") {
		let products = addProductTo(state.productData.slice(), action); // the entire state object is replaced even
		state = {productData: products, cartItems: state.cartItems} // though only one property on it needed to be changed

	}
  if (action.type === "EDIT_PRODUCT") {
  	let products = editProduct(state.productData.slice(), action) // same thing here
  	state = {productData: products, cartItems: state.cartItems}
  }
  return state;
}

// which of the above approaches is best practice?

const initialState = {
	productData: productData,
	cartItems: []
}

const store = createStore(reducer, initialState)


export default store