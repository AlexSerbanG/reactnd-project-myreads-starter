import React from "react";
import PropTypes from "prop-types";
import Select from "../Select/Select";
import { SelectOptions } from "../data";
import "./Book.css";

const Book = ({
  id,
  title,
  authors,
  backgroundUrl,
  shelf,
  onChangeHandler,
}) => (
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
          onChangeHandler={(e) =>
            onChangeHandler(
              { id, title, authors, backgroundUrl, shelf },
              e.target.value
            )
          }
        />
      </div>
    </div>
    <div className="book-title">{title}</div>
    <div className="book-authors">{authors.join(" & ")}</div>
  </div>
);

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  shelf: PropTypes.string.isRequired,
  backgroundUrl: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default Book;
