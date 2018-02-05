class ShoppingManager extends React.Component {
  constructor() {
    super();

    this.state = {
      product_data: product_data, 
      cart_items: []
    }
  }

  addToCart = (id) => {
    let toAddToCart = this.state.product_data.filter(function(product) {
      return product.id === id;
    });

    let remainingProducts = this.state.product_data.map(function(product) {
      if (product.id === id){
        let new_product = Object.assign({}, product)
        new_product.quantity -= 1
        return new_product;
      } else {
        return product;
      }
    });

    let cartItems = this.state.cart_items.slice(0).concat(toAddToCart);

    this.setState(prevState => {
      return {product_data: remainingProducts, cart_items: cartItems}
    });
  }


  removeFromCart = (id) => {
      let new_products = this.state.product_data.map((item) => {
        if (item.id === id){
         let new_product = Object.assign({}, item)
          new_product.quantity += 1
          return new_product
        } else {
          return item;
        }
      })

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

  emptyCart = () => {
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
      <CartManager 
        cart_items={this.state.cart_items}
        removeFromCart={this.removeFromCart}
        emptyCart={this.emptyCart}
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
  emptyCart = (e) => {
    e.preventDefault();
    this.props.emptyCart();
  }
  render() {
    return (
      <div>
        <CartItemList removeFromCart={this.props.removeFromCart} 
                      cart_items={this.props.cart_items}/>
        <button className="button" onClick={this.emptyCart}>Empty Cart </button>
    </div>
    )
  }
}

class CartItemList extends React.Component {
  totalPrice = () => {
    return this.props.cart_items.reduce((accumulator, item) => {
      return accumulator += item.price;
    }, 0)
  }
  render() {
    let cart_items = this.props.cart_items.map((item, index) => {
      return <CartItem key={item + '-' + index}
                       id={item.id}
                       title={item.title}
                       price={item.price}
                       removeFromCart={this.props.removeFromCart}
              />
    });

    return (
      <div>
        <h3>Cart</h3>
        {cart_items}
        <div>
         Total: ${this.totalPrice()}
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
        <p>{this.props.title} - {this.props.price}</p>
        <button className="button" onClick={this.removeFromCart}>Remove </button>
      </div>
    );
  }
}





ReactDOM.render(
  <ShoppingManager />,
  document.getElementById('app')
);
