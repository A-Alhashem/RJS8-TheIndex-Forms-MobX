import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class AuthorStore {
  constructor() {
    this.authors = [];
    this.loading = true;
    this.query = "";
    this.success = false;

    this.addAuthor = this.addAuthor.bind(this);
  }

  fetchAuthors() {
    return instance
      .get("/api/authors/")
      .then(res => res.data)
      .then(authors => {
        this.authors = authors;
        this.loading = false;
      })
      .catch(err => console.error(err));
  }

  addAuthor(newAuthor) {
    return instance
      .post("/api/authors/", newAuthor)
      .then(res => res.data)
      .then(authors => {
        this.authors.push(authors);
        this.success = true;
      })
      .catch(err => console.log(err));
  }

  get filteredAuthors() {
    return this.authors.filter(author =>
      `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(this.query.toLowerCase())
    );
  }

  getAuthorById(id) {
    return this.authors.find(author => +author.id === +id);
  }
}

decorate(AuthorStore, {
  authors: observable,
  loading: observable,
  query: observable,
  filteredAuthors: computed
});

const authorStore = new AuthorStore();
authorStore.fetchAuthors();

export default authorStore;
