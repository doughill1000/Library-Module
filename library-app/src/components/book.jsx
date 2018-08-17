import React from "react";
import "../styles/book.css";

/**Books component
 *
 * Displays information about a book
 */
const Book = props => {
  const { imageUrl, title, author } = props.book;
  return (
    <React.Fragment>
      <div className={" col-8 col-sm-6 col-md-3 col-lg-1"}>
        <img src={imageUrl} alt={"Book Cover"} />
      </div>
      <div className={"col-12 col-md-8"}>
        <div>Title: {title} </div>
        <div>By: {author}</div>
      </div>
    </React.Fragment>
  );
};

export default Book;
