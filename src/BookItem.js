import React from "react";
import PropTypes from "prop-types";

function BookItem(props) {
  
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: props.book.imageLinks
                ? `url(${props.book.imageLinks.thumbnail})`
                : "url(https://dummyimage.com/128x170/eee/000000&text=No+Cover)"
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={props.book.shelf ? props.book.shelf : "none"}
              onChange={e => props.onChangeCategory(e.target.value, props.book)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        {props.book.authors && (
          <div className="book-authors">
            {props.book.authors.join(', ')}
          </div>
        )}
      </div>
    </li>
  );
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeCategory: PropTypes.func.isRequired
};

export default BookItem;
