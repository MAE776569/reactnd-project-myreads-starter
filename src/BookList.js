import React from "react";
import BookItem from "./BookItem";
import PropTypes from "prop-types";

function BookList(props) {
  return (
    <ol className="books-grid">
      {props.books.map(book => (
        <BookItem
          book={book}
          key={book.id}
          onChangeCategory={props.onChangeCategory}
        />
      ))}
    </ol>
  );
}

BookList.propTypes = {
  books: PropTypes.array.isRequired
};

export default BookList;
