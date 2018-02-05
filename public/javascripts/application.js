class Application extends React.Component {
  render() {
    return (
    <div>
      <p>Welcome to the Shop!</p>
      <ProductManager />
    </div>
    );
  }
}

class ProductManager extends React.Component {
    render () {
        return (
            <ProductList />
        );
    }
}

class ProductList extends React.Component {
    render () {
        return (
        <div>
            <Product />
            <Product />
            <Product />
        </div>
        );
    }
}

class Product extends React.Component {
    render () {
        return (
            <div>
                <p>{this.props.title} - {this.props.price} x {this.props.quantity}</p>

            </div>
        );
    }
}






ReactDOM.render(
  <ShoppingManager />,
  document.getElementById('app')
);
