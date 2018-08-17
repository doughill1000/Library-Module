import React, { Component } from "react";
import LibraryBook from "./libraryBook";
import "../styles/library.css";

/**
 * Incremented values for both books and book copies.
 * Kept at this level to ensure they are unique as copies and books are created
 */
let libraryBookId = 0;
let libraryBookCopySerialNum = 0;

/**
 * Library for library items
 *
 * Displays a list of library items
 */
class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryBooks: props.libraryBooks
    };
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.libraryBooks.map((lb, i) => (
            <li key={i}>
              <LibraryBook
                libraryBook={lb}
                generateNewLibraryBookId={this.generateNewLibraryBookId}
                generateNewLibraryBookCopySerialNum={
                  this.generateNewLibraryBookCopySerialNum
                }
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /**
   * Generates an new book id.
   */
  generateNewLibraryBookId() {
    libraryBookId = libraryBookId + 1;
    return libraryBookId;
  }

  /**
   * Generates a new book serial number
   */
  generateNewLibraryBookCopySerialNum() {
    libraryBookCopySerialNum = libraryBookCopySerialNum + 1;
    return libraryBookCopySerialNum;
  }
}

export default Library;
