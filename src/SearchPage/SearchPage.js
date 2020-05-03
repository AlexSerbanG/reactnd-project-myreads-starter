import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Shelf } from "../Shelf";
import * as BooksAPI from "../BooksAPI";
import { debounce, bookFromDb } from "../utils";
import "./SearchPage.css";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.getBooksByQuery = debounce(this.getBooksByQuery, 300);
    this.state = {
      query: "",
      books: [],
    };
  }

  handleQueryChange = (e) => {
    this.setState(
      {
        query: e.target.value,
      },
      this.getBooksByQuery
    );
  };

  getBooksByQuery = () => {
    const { query } = this.state;
    if (query.trim()) {
      BooksAPI.search(query.trim()).then((result) => {
        this.setState({ books: result.error ? [] : result.map(bookFromDb) });
      });
    }
  };

  render() {
    const { query, books } = this.state;
    const { onChangeHandler, ownBooks } = this.props;
    const shelfBooks = books.map((book) => {
      const alreadyOwned = ownBooks.find(
        (ownedBook) => ownedBook.id === book.id
      );
      return {
        ...book,
        ...(alreadyOwned && { shelf: alreadyOwned.shelf }),
      };
    });
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
        */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleQueryChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          {query !== "" && books.length === 0 && <p>No results</p>}
          {query !== "" && books.length > 0 && (
            <Shelf books={shelfBooks} onChangeHandler={onChangeHandler} />
          )}
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  ownBooks: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default SearchPage;
