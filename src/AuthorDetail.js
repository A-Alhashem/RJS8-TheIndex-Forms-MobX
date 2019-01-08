import React, { Component } from "react";

// Components
import BookTable from "./BookTable";
import AddBookModal from "./AddBookModal";

// Stores
import authorStore from "./stores/AuthorStore";
import bookStore from "./stores/BookStore";
import BookForm from "./forms/BookForm";
class AuthorDetail extends Component {
  render() {
    const authorID = this.props.match.params.authorID;
    const author = authorStore.getAuthorById(authorID);
    const books = author.books.map(bookID => bookStore.getBookById(bookID));

    return (
      <div>
        <div>
          <AddBookModal authorID={author.id} />
          <h3>{author.first_name + " " + author.last_name}</h3>
          <img
            src={author.imageUrl}
            className="img-thumbnail img-fluid"
            alt={author.first_name + " " + author.last_name}
          />
        </div>
        <BookTable books={books} />
      </div>
    );
  }
}

export default AuthorDetail;
