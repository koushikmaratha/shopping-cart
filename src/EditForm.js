import React, { Component } from 'react';

class EditForm extends Component {
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

export default EditForm
