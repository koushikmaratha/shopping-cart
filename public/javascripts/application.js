class ShoppingManager extends React.Component {
  render() {
    return (
    <div>
      <p>Welcome to the Shop!</p>
      <ProductManager product_data={product_data}/>
    </div>
    );
  }
}

class ProductManager extends React.Component {
    render () {
        return (
            <ProductList product_data={this.props.product_data}/>
        );
    }
}

class ProductList extends React.Component {
    render () {
        let products = this.props.product_data.map((product, index) => {
                        return <Product key={product.title + '-' + index}title={product.title} price={product.price} quantity={product.quantity} />
                      });
        return (
          <div>
            {products}
          </div>
        );
    }
}

class Product extends React.Component {
    render () {
        return (
            <div className="product">
                <p>{this.props.title} - {this.props.price} x {this.props.quantity}</p>
            </div>
        );
    }
}

ReactDOM.render(
  <ShoppingManager />,
  document.getElementById('app')
);
