import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  constructor() {
    this.books = [];
    this.query = "";
    this.loading = true;

    this.addBook = this.addBook.bind(this);
  }

  fetchBooks() {
    return instance
      .get("https://the-index-api.herokuapp.com/api/books/")
      .then(res => res.data)
      .then(books => {
        this.books = books;
        this.loading = false;
      })
      .catch(err => console.error(err));
  }

  addBook(newBook, authorId) {
    newBook = {
      ...newBook,
      authors: [authorId]
    };
    return instance
      .post("/api/books/", newBook)
      .then(res => res.data)
      .then(book => {
        this.books.push(book);
      });
  }
  get filteredBooks() {
    return this.books.filter(book => {
      return book.title.toLowerCase().includes(this.query.toLowerCase());
    });
  }

  getBookById(id) {
    return this.books.find(book => +book.id === +id);
  }

  getBooksByColor(color) {
    return this.filteredBooks.filter(book => book.color === color);
  }
}

decorate(BookStore, {
  books: observable,
  query: observable,
  loading: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
