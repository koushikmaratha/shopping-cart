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

  render() {
    return (
    <div>
      <header className="header">
        <h1>Welcome to the Shop!</h1>
      </header>
      <ProductManager 
        product_data={this.state.product_data}
        add_to_cart={this.addToCart}

      />
      <CartManager 
        cart_items={this.state.cart_items}
      />
    </div>
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
  render() {
    return (
      <CartItemList cart_items={this.props.cart_items}/>
    );
  }
}

class CartItemList extends React.Component {
  totalPrice = () => {
    return this.props.cart_items.reduce((accumulator, item) => {
      return accumulator += item.price;
    }, 0)
  }
  render() {
    let cart_items = this.props.cart_items.map(function(item, index) {
      return <CartItem key={item + '-' + index}
                       id={item.id}
                       title={item.title}
                       price={item.price}
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
  render() {
    return (
      <div className="cart">
        <p>{this.props.title} - {this.props.price}</p>
      </div>
    );
  }
}





ReactDOM.render(
  <ShoppingManager />,
  document.getElementById('app')
);
