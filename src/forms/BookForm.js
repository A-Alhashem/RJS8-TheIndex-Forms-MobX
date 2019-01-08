import React, { Component } from "react";

import bookStore from "../stores/BookStore";

class BookForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      color: "blue"
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    bookStore.addBook(this.state, this.props.authorID);
  }
  render() {
    return (
      <div className="mt-5">
        <h1>{bookStore.success}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              name="title"
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <select name="color" onChange={this.onTextChange}>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="white">White</option>
            </select>
          </div>
          <input onClick={this.handleSubmit} type="submit" /> <br />
        </form>
      </div>
    );
  }
}

export default BookForm;
