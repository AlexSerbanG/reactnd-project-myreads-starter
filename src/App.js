import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { Library } from "./Library";
import { SearchPage } from "./SearchPage";
import * as BooksApi from "./BooksAPI";
import { bookFromDb } from "./utils";
import { ShelfType } from "./data";

class BooksApp extends React.Component {
  state = {
    ownBooks: [],
    isReady: false,
  };

  componentDidMount() {
    BooksApi.getAll().then((result) => {
      this.setState({ ownBooks: result.map(bookFromDb), isReady: true });
    });
  }

  moveBook = (updatedBook, shelf) => {
    const { ownBooks } = this.state;
    BooksApi.update(updatedBook, shelf).then((result) => {
      const alreadyOwnedIndex = ownBooks.findIndex(
        (ownBook) => ownBook.id === updatedBook.id
      );
      const newShelf = ShelfType.find((s) => s.id === shelf);
      let newBooks = [];
      if (alreadyOwnedIndex > -1) {
        if (newShelf.visible) {
          newBooks = [...ownBooks];
          newBooks[alreadyOwnedIndex] = {
            ...ownBooks[alreadyOwnedIndex],
            shelf: newShelf.id,
          };
        } else {
          newBooks = [...ownBooks];
          newBooks.splice(alreadyOwnedIndex, 1);
        }
      } else {
        newBooks = [...ownBooks, { ...updatedBook, shelf }];
      }
      this.setState({
        ownBooks: newBooks,
      });
    });
  };

  render() {
    const { ownBooks, isReady } = this.state;
    return (
      <div className="app">
        {isReady && (
          <React.Fragment>
            <Route
              exact
              path="/"
              render={() => (
                <Library books={ownBooks} onChangeHandler={this.moveBook} />
              )}
            />
            <Route
              path="/search"
              render={() => (
                <SearchPage
                  ownBooks={ownBooks}
                  onChangeHandler={this.moveBook}
                />
              )}
            />
          </React.Fragment>
        )}
        {!isReady && <p>Loading...</p>}
      </div>
    );
  }
}

export default BooksApp;
