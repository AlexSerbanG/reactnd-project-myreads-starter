import React from "react";
import { Link } from "react-router-dom";
import { Shelf } from "../Shelf";
import * as BooksApi from "../BooksAPI";
import { ShelfType } from "../data";
import { bookFromDb } from "../utils";
import "./Library.css";

class Library extends React.Component {
  state = {
    shelves: [],
    isReady: false,
  };

  componentDidMount() {
    const shelves = {};

    BooksApi.getAll().then((result) => {
      result.forEach((book) => {
        const currentBook = bookFromDb(book);
        if (shelves[book.shelf]) {
          shelves[book.shelf].push(currentBook);
        } else {
          shelves[book.shelf] = [currentBook];
        }
      });

      this.setState({ shelves, isReady: true });
    });
  }

  render() {
    const { shelves, isReady } = this.state;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {isReady && (
          <React.Fragment>
            <div className="list-books-content">
              {ShelfType.map(
                ({ label, id, visible }) =>
                  visible && (
                    <Shelf books={shelves[id]} key={id} title={label} />
                  )
              )}
            </div>
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </React.Fragment>
        )}
        {!isReady && <p>Loading...</p>}
      </div>
    );
  }
}

export default Library;
