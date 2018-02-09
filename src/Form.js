import React, { Component } from 'react';
import store from './store'

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayed: false,
      fields: {
        title: '',
        price: '',
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
    store.dispatch({
      type: "ADD_PRODUCT",
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

export default Form
