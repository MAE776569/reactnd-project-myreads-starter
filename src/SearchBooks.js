import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookList from "./BookList";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";

class SearchBooks extends Component {
  state = {
    query: "",
    searchBooks: []
  };

  static propTypes = {
    onChangeCategory: PropTypes.func.isRequired,
    libraryBooks: PropTypes.array.isRequired
  };

  handleSearch = (e) => {
    const searchQuery = e.target.value;

    //if the input is not empty send a request
    if (searchQuery) {
      BooksAPI.search(searchQuery).then(books => {
        //if there is no error
        if (Array.isArray(books)) {
          books = books.map(x =>
            Object.assign(x, this.props.libraryBooks.find(y => y.id === x.id))
          );

          this.setState({
            query: searchQuery,
            searchBooks: books
          });
        } else this.setState({ query: "" });
      });
    }

    //else set the value to empty query
    else this.setState({ query: "" });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" style={{ cursor: "pointer" }}>
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              defaultValue={this.state.query}
              onInput={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.query && (
            <BookList
              books={this.state.searchBooks}
              onChangeCategory={this.props.onChangeCategory}
            />
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
