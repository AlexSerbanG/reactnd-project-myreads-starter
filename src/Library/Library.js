import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Shelf } from "../Shelf";
import { ShelfType } from "../data";
import "./Library.css";

const Library = ({ books }) => {
  const shelves = {};
  books.forEach((book) => {
    if (shelves[book.shelf]) {
      shelves[book.shelf].push(book);
    } else {
      shelves[book.shelf] = [book];
    }
  });
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {ShelfType.map(
          ({ label, id, visible }) =>
            visible && <Shelf books={shelves[id]} key={id} title={label} />
        )}
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
};

Library.propTypes = {
  books: PropTypes.array.isRequired,
};

export default Library;
