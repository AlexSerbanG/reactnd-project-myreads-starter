import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { Library } from "./Library";
import { SearchPage } from "./SearchPage";

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={Library} />
        <Route path="/search" component={SearchPage} />
      </div>
    );
  }
}

export default BooksApp;
