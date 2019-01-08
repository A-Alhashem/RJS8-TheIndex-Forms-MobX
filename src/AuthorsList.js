import React, { Component } from "react";
import { observer } from "mobx-react";

// Components
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";
import AddAuthorCard from "./AddAuthorCard";

// Store
import authorStore from "./stores/AuthorStore";

class AuthorsList extends Component {
  getAuthCard() {
    if (!authorStore.success) {
      return <AddAuthorCard add={authorStore.addAuthor} />;
    }
  }
  render() {
    console.log(authorStore.success);
    const authorCards = authorStore.filteredAuthors.map(author => (
      <AuthorCard key={author.first_name + author.last_name} author={author} />
    ));

    return (
      <div>
        <h3>Authors</h3>
        <h3>{authorStore.success}</h3>
        {this.getAuthCard()}
        <SearchBar store={authorStore} />
        <div className="row">{authorCards}</div>
      </div>
    );
  }
}

export default observer(AuthorsList);
