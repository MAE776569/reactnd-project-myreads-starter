import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookCategories from "./BookCategories";
import SearchBooks from "./SearchBooks";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  };

  componentDidMount() {
    //get all books and update state
    BooksAPI.getAll().then(books => {
      this.setState({
        books
      });
    });
  }

  changeCategory = (shelf, book) => {
    const bookIndex = this.state.books.findIndex(b => b.id === book.id);
    this.setState(prevState => {
      const books = prevState.books;
      books[bookIndex].shelf = shelf;
      return { books };
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/"
          render={() => (
            <BookCategories
              books={this.state.books}
              onChangeCategory={this.changeCategory}
            />
          )}
        />

        <Route path="/search" component={SearchBooks} />
      </div>
    );
  }
}

export default BooksApp;
