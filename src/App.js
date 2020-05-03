import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { Library } from "./Library";
import { SearchPage } from "./SearchPage";
import * as BooksApi from "./BooksAPI";
import { bookFromDb } from "./utils";

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

  render() {
    const { ownBooks, isReady } = this.state;
    return (
      <div className="app">
        {isReady && (
          <React.Fragment>
            <Route exact path="/" render={() => <Library books={ownBooks} />} />
            <Route
              path="/search"
              render={() => <SearchPage ownBooks={ownBooks} />}
            />
          </React.Fragment>
        )}
        {!isReady && <p>Loading...</p>}
      </div>
    );
  }
}

export default BooksApp;
