class ShoppingManager extends React.Component {
  constructor() {
    super();

    this.state = {
      productData,
      cartItems: [],
    };
  }

  lastID = () => (this.state.productData[this.state.productData.length - 1].id)

  deleteProduct = (id) => {
    const updatedProducts = this.state.productData.filter(product => product.id !== id);
    this.setState({
      productData: updatedProducts,
    });
  }

  addProduct = (newProduct) => {
    newProduct.id = this.lastID() + 1;
    const updatedProducts = [...this.state.productData, newProduct];
    this.setState({
      productData: updatedProducts,
    });
  }

  editProduct = (id, productInfo) => {
    productInfo.id = Number(id);
    const newProductData = this.state.productData.map((product) => {
      if (product.id === id) { return productInfo; }
      return product;
    });

    this.setState({
      productData: newProductData,
    });
  }

  addToCart = (id) => {
    let cartItems;

    const remainingProducts = this.state.productData.map((product) => {
      if (product.id === id) {
        const newProduct = Object.assign({}, product);
        newProduct.quantity -= 1;
        return newProduct;
      }
      return product;
    });

    const toAddToCart = this.state.productData.find(product => product.id === id);
    const foundItem = this.state.cartItems.find(product => product.id === id);

    if (foundItem) {
      cartItems = this.state.cartItems.map((item) => {
        if (foundItem === item) {
          const itemCopy = Object.assign({}, item);
          itemCopy.quantity += 1;
          return itemCopy;
        }
        return item;
      });
    } else {
      const newItem = Object.assign({}, toAddToCart);
      newItem.quantity = 1;
      cartItems = this.state.cartItems.concat(newItem);
    }

    this.setState(prevState => ({
      // should we use prevState to calculate remainingProducts here? if so, any suggestions?
      productData: remainingProducts,
      cartItems,
    }));
  }

  removeFromCart = (id) => {
    const foundItem = this.state.cartItems.find((product) => {
      return product.id === id;
    });

    const newProducts = this.state.productData.map((product) => {
      if (id === product.id) {
        const productCopy = Object.assign({}, product);
        productCopy.quantity += foundItem.quantity; // should add the total quantity back from the same item
        return productCopy;
      } else {
        return product;
      }
    });

    const newCart = this.state.cartItems.filter((item) => {
      return item.id !== id
    })

    this.setState(prevState => {
      return {
        productData: newProducts,
        cartItems: newCart
      }
    })
  }

  checkout = () => {
    this.setState(prevState => {
      return {
        cartItems: []
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
        productData={this.state.productData}
        addToCart={this.addToCart}
        deleteProduct={this.deleteProduct}
        editProduct={this.editProduct}

      />

      <Form
        addProduct={this.addProduct}
      />
      <CartManager
        cartItems={this.state.cartItems}
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
      <ProductList productData={this.props.productData}
                   addToCart={this.props.addToCart}
                   deleteProduct={this.props.deleteProduct}
                   editProduct={this.props.editProduct}
      />
    );
  }
}

class ProductList extends React.Component {
  render () {
    let products = this.props.productData.map((product, index) => {
                    return <Product key={product.title + '-' + index}
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    quantity={product.quantity}
                                    add_to_cart={this.props.add_to_cart}
                                    deleteProduct={this.props.deleteProduct}
                                    editProduct={this.props.editProduct}
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
  constructor(props) {
    super(props);
    this.state = {
      formDisplayed: false
    }
  }

  showForm = () => {
    this.setState({
      formDisplayed: true
    })
  }

  handleAddToCartClick = (e) => {
    e.preventDefault();
    if (this.props.quantity > 0){
      this.props.addToCart(this.props.id);
    };
  }

  handleProductDeletion = (e) => {
    e.preventDefault();
    this.props.deleteProduct(this.props.id)
  }

  showProduct = () => {
    this.setState({
      formDisplayed: false,
    });
  }

  render() {
    if (this.state.formDisplayed) {
     return (
        <EditForm
          title={this.props.title}
          price={this.props.price}
          quantity={this.props.quantity}
          id={this.props.id}
          editProduct={this.props.editProduct}
          cancelEdit={this.showProduct}
        />
      )
    } else {
      return (
        <div className="product">
          <p>{this.props.title} - ${this.props.price} x {this.props.quantity} <button onClick={this.handleProductDeletion}>X</button></p>
          <button className="button" onClick={this.handleAddToCartClick}>
          Add to cart
          </button>
          <button className="button" onClick={this.showForm}> Edit</button>
        </div>
      );
    }

  }
}

class EditForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fields: {
        title: this.props.title,
        price: this.props.price,
        quantity: this.props.quantity,
      }
    };
  }

  handleInputChange = (e) => {
    const updatedFields = this.state.fields;
    updatedFields[e.target.name] = e.target.value;
    this.setState({
      fields: updatedFields,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editProduct(this.props.id, this.state.fields)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text"
               name="title"
               value={this.state.fields.title}
               onChange={this.handleInputChange}
        />
        <label htmlFor="price">Price</label>
        <input type="text"
               name="price"
               value={this.state.fields.price}
               onChange={this.handleInputChange}
        />
        <label htmlFor="quantity">Quantity</label>
        <input type="text"
               name="quanity"
               value={this.state.fields.quantity}
               onChange={this.handleInputChange}
        />

        <input type="submit" value="Submit Edits" />
        <button onClick={this.props.cancelEdit}>Cancel</button>
      </form>
    )
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
                      cartItems={this.props.cartItems}/>
        <button className="button" onClick={this.checkout}>Check Out </button>
    </div>
    )
  }
}

class CartItemList extends React.Component {
  totalPrice = () => {
    return this.props.cartItems.reduce((accumulator, item) => {
      return accumulator += item.price * item.quantity;
    }, 0);
  }
  render() {
    let cartItems = this.props.cartItems.map((item, index) => {
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
        {cartItems}
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
  constructor(props) {
    super(props);

    this.state = {
      displayed: false,
      fields: {
        title: '',
        name: '',
        quantity: '',
      },
    };
  }

  toggleForm = () => {
    this.setState({
      displayed: !this.state.displayed,
    });
  }

  addProduct = (e) => {
    e.preventDefault();
    this.props.addProduct({
      title: this.state.fields.title,
      price: this.state.fields.price,
      quantity: this.state.fields.quantity,
    })

    this.toggleForm();
  }

  updateField = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value
    this.setState({fields: fields})
  }

  render() {
    if (this.state.displayed) {
      return (
        <div>
          <h3>Add Product</h3>
          <form onSubmit={this.addProduct}>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={this.state.title}
                onChange={this.updateField}
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                id="price"
                value={this.state.price}
                onChange={this.updateField}
              />
            </div>
            <div>
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                name="quantity"
                id="quantity"
                value={this.state.quantity}
                onChange={this.updateField}
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
