import React from "react";
import "./Book.css";
import Select from "../Select/Select";
import { SelectOptions } from "../data";

const Book = ({ title, authors, backgroundUrl, shelf }) => (
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url("${backgroundUrl}")`,
        }}
      />
      <div className="book-shelf-changer">
        <Select
          value={shelf}
          options={SelectOptions}
          onChangeHandler={(e) => console.log("here", e.target.value)}
        />
      </div>
    </div>
    <div className="book-title">{title}</div>
    <div className="book-authors">{authors.join(" & ")}</div>
  </div>
);

export default Book;
