import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookCategories from "./BookCategories";
import SearchBooks from "./SearchBooks";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    //Get all books and update state
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  changeCategory = (shelf, book) => {
    //Find the book by id
    const bookIndex = this.state.books.findIndex(b => b.id === book.id);
    //Update the book in the database
    BooksAPI.update(book, shelf);

    //If the book found change the shelf
    if (bookIndex !== -1) {
      this.setState(prevState => {
        const books = prevState.books;
        books[bookIndex].shelf = shelf;
        return { books };
      });
    }
    //else add it to the books
    else {
      book.shelf = shelf;
      this.setState(prevState => {
        const books = prevState.books;
        books.push(book);
        return { books };
      });
    }
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookCategories
              books={this.state.books}
              onChangeCategory={this.changeCategory}
            />
          )}
        />

        <Route
          path="/search"
          render={() => (
            <SearchBooks
              libraryBooks={this.state.books}
              onChangeCategory={this.changeCategory}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
