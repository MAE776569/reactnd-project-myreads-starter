import React, { Component } from "react";
import BookList from "./BookList";
import PropTypes from "prop-types";

class BookCategories extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  };

  render() {
    const currentlyReadingBooks = this.props.books.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToReadBook = this.props.books.filter(
      book => book.shelf === "wantToRead"
    );
    const readBooks = this.props.books.filter(book => book.shelf === "read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <BookList
                  books={currentlyReadingBooks}
                  onChangeCategory={this.props.onChangeCategory}
                />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <BookList
                  books={wantToReadBook}
                  onChangeCategory={this.props.onChangeCategory}
                />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BookList
                  books={readBooks}
                  onChangeCategory={this.props.onChangeCategory}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

export default BookCategories;
