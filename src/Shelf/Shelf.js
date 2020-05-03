import React from "react";
import PropTypes from "prop-types";
import { Book } from "../Book";
import "./Shelf.css";

const Shelf = ({ title, books, onChangeHandler }) => (
  <div className="bookshelf">
    {!!title && <h2 className="bookshelf-title">{title}</h2>}
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <Book {...book} onChangeHandler={onChangeHandler}/>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

Shelf.defaultProps = {
  title: "",
};

Shelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
};

export default Shelf;
