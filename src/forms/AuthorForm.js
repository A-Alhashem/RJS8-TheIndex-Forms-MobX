import React, { Component } from "react";

import authorStore from "../stores/AuthorStore";

class AuthorForm extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      imageUrl: "",
      books: []
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    authorStore.addAuthor(this.state);
    if (authorStore.success) {
      this.props.onClose();
    }
  }
  render() {
    return (
      <div className="mt-5">
        <h1>{authorStore.success}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">First Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              value={this.state.first_name}
              name="first_name"
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Last Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              value={this.state.last_name}
              name="last_name"
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Image URL</span>
            </div>
            <input
              type="text"
              className="form-control"
              value={this.state.imageUrl}
              name="imageUrl"
              onChange={this.onTextChange}
            />
          </div>
          <input onClick={this.handleSubmit} type="submit" /> <br />
        </form>
      </div>
    );
  }
}

export default AuthorForm;
