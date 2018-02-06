class ShoppingManager extends React.Component {
  constructor() {
    super();

    this.state = {
      product_data: product_data,
      cart_items: []
    }
  }

  addToCart = (id) => {
    let cartItems;

    let remainingProducts = this.state.product_data.map(function(product) {
      if (product.id === id){
        let new_product = Object.assign({}, product)
        new_product.quantity -= 1;
        return new_product;
      } else {
        return product;
      }
    });

    let toAddToCart = this.state.product_data.find(function(product) {
      return product.id === id;
    });

    let foundItem = this.state.cart_items.find(function(product) {
      return product.id === id;
    });

    if (foundItem) {
      cartItems = this.state.cart_items.map(function(item) {
        if (foundItem === item) {
          let item_copy = Object.assign({}, item);
          item_copy.quantity += 1;
          return item_copy;
        } else {
          return item;
        }
      });
    } else {
      let new_item = Object.assign({}, toAddToCart);
      new_item.quantity = 1;
      cartItems = this.state.cart_items.concat(new_item);
    }

    this.setState(prevState => {
      return {product_data: remainingProducts, cart_items: cartItems}
    });
  }

  removeFromCart = (id) => {
    let foundItem = this.state.cart_items.find(function(product) {
      return product.id === id;
    });

    let new_products = this.state.product_data.map(function(product) {
      if (id === product.id) {
        let product_copy = Object.assign({}, product);
        product_copy.quantity += foundItem.quantity;   // should add the total quantity back from the same item
        return product_copy;
      } else {
        return product;
      }
    });

    let new_cart = this.state.cart_items.filter((item) => {
      return item.id !== id
    })

    this.setState(prevState => {
      return {
        product_data: new_products,
        cart_items: new_cart
      }
    })
  }

  checkout = () => {
    this.setState(prevState => {
      return {
        cart_items: []
      }
    })
  }

  render() {
    return (
    <main>
      <header className="header">
        <h1>Welcome to the Shop!</h1>
      </header>
      <ProductManager
        product_data={this.state.product_data}
        add_to_cart={this.addToCart}

      />

      <Form />
      <CartManager
        cart_items={this.state.cart_items}
        removeFromCart={this.removeFromCart}
        checkout={this.checkout}
      />
    </main>
    );
  }
}

class ProductManager extends React.Component {
  render () {
    return (
      <ProductList product_data={this.props.product_data}
                   add_to_cart={this.props.add_to_cart}
      />
    );
  }
}

class ProductList extends React.Component {
  render () {
    let products = this.props.product_data.map((product, index) => {
                    return <Product key={product.title + '-' + index}
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    quantity={product.quantity}
                                    add_to_cart={this.props.add_to_cart}
                           />
                   });
    return (
      <div>
        {products}
      </div>
    );
  }
}

class Product extends React.Component {
  handleAddToCartClick = (e) => {
    e.preventDefault();
    if (this.props.quantity > 0){
      this.props.add_to_cart(this.props.id);
    };
  }

  render () {
    return (
      <div className="product">
        <p>{this.props.title} - ${this.props.price} x {this.props.quantity}</p>
        <button className="button" onClick={this.handleAddToCartClick}>
        Add to cart
        </button>
      </div>
    );
  }
}

class CartManager extends React.Component {
  checkout = (e) => {
    e.preventDefault();
    this.props.checkout();
  }
  render() {
    return (
      <div>
        <CartItemList removeFromCart={this.props.removeFromCart}
                      cart_items={this.props.cart_items}/>
        <button className="button" onClick={this.checkout}>Check Out </button>
    </div>
    )
  }
}

class CartItemList extends React.Component {
  totalPrice = () => {
    return this.props.cart_items.reduce((accumulator, item) => {
      return accumulator += item.price * item.quantity;
    }, 0);
  }
  render() {
    let cart_items = this.props.cart_items.map((item, index) => {
      return <CartItem key={item + '-' + index}
                       id={item.id}
                       title={item.title}
                       price={item.price}
                       quantity={item.quantity}
                       removeFromCart={this.props.removeFromCart}
              />
    });

    return (
      <div>
        <h3>Cart</h3>
        {cart_items}
        <div>
         Total: ${(this.totalPrice()).toFixed(2)}
        </div>
      </div>
    );
  }
}

class CartItem extends React.Component {
  removeFromCart = (e) => {
    e.preventDefault();
    this.props.removeFromCart(this.props.id)
  }
  render() {
    return (
      <div className="cart">
        <p>{this.props.title} - {this.props.price} x {this.props.quantity}</p>
        <button className="button" onClick={this.removeFromCart}>Remove </button>
      </div>
    );
  }
}

class Form extends React.Component {
  // state = { displayed: false }
  constructor(props) {
    super(props)

    this.state = {
      displayed: false,
      title: this.props.title || '',
      name: this.props.name || '',
      quantity: this.props.quantity || ''
    }
  }

  toggleForm = () => {
    this.setState({
      displayed: !this.state.displayed
    });
  }

  render() {
    if (this.state.displayed) {
      return (
        <div>
          <h3>Add Product</h3>
          <form className="product-form">
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={this.state.title}
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                id="price"
                value={this.state.price}
              />
            </div>
            <div>
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                name="quantity"
                id="quantity"
                value={this.state.quantity}
              />
            </div>
            <input type="submit" />
            <button onClick={this.toggleForm}>Cancel</button>
          </form>
        </div>
      );
    } else {
      return (<button onClick={this.toggleForm}>Add Product</button>)
    }
  }
}





ReactDOM.render(
  <ShoppingManager />,
  document.getElementById('app')
);
