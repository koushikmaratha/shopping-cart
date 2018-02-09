import React, { Component } from 'react';
import store from './store'

class EditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        title: this.props.title,
        price: this.props.price,
        quantity: this.props.quantity,
        id: this.props.id
      }
    };
  }

  handleInputChange = (e) => {
    const updatedFields = Object.assign({}, this.state.fields);
    updatedFields[e.target.name] = e.target.value;
    this.setState({
      fields: updatedFields,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.fields)
    store.dispatch({
      type: "EDIT_PRODUCT",
      newInfo: this.state.fields
    })
    this.props.cancelEdit();
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
               name="quantity"
               value={this.state.fields.quantity}
               onChange={this.handleInputChange}
        />

        <input type="submit" value="Submit Edits" />
        <button onClick={this.props.cancelEdit}>Cancel</button>
      </form>
    )
  }

}

export default EditForm
