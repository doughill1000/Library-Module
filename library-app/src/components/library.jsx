import React, { Component } from "react";
import LibraryBook from "./libraryBook";
import "../styles/library.css";

let libraryBookId = 0;
let libraryBookCopySerialNum = 0;

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

  generateNewLibraryBookId() {
    libraryBookId = libraryBookId + 1;
    return libraryBookId;
  }

  generateNewLibraryBookCopySerialNum() {
    libraryBookCopySerialNum = libraryBookCopySerialNum + 1;
    return libraryBookCopySerialNum;
  }
}

export default Library;
