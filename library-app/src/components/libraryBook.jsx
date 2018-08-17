import React, { Component } from "react";
import Book from "./book";
import LibraryBookCopies from "./libraryBookCopies";

/**
 * Library Book Component
 *  
 * Maintains and manages library book details such as borrowing 
 * library copies and returns.
*/
class LibraryBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Copies of the library book
      copies: props.libraryBook.copies
    };
  }

  render() {
    const { book } = this.props.libraryBook;
    const { copies } = this.state;
    return (
      <React.Fragment>
        <div className={"row"}>
          {/* Book Information */}
          <Book book={book} />

          {/* Total number of copies for the book */}
          <div className={"col-12 m-2"}>
            Total Number of Copies: {copies.length}
          </div>

          {/* List of paper copies */}
          <LibraryBookCopies
            name={"Paper"}
            copies={this.getCopiesOfType(CopyTypes.PAPER)}
            copyType={CopyTypes.PAPER}
            handleAddCopy={this.handleAddCopy}
            handleCheckoutCopy={this.handleCheckoutCopy}
            handleReturnCopy={this.handleReturnCopy}
          />

          {/* List of audio copies */}
          <LibraryBookCopies
            name={"Audio"}
            copies={this.getCopiesOfType(CopyTypes.AUDIO)}
            copyType={CopyTypes.AUDIO}
            handleAddCopy={this.handleAddCopy}
            handleCheckoutCopy={this.handleCheckoutCopy}
            handleReturnCopy={this.handleReturnCopy}
          />
        </div>
        <br />
      </React.Fragment>
    );
  }

  /**
   * Gets the copies of the book for a particular format.
   * Uses CopyTypes enum at bottom of the file.
   */
  getCopiesOfType = copyType => {
    return this.getDeepCloneCopies().filter(copy => copy.type === copyType);
  };

  /**
   *  Adds a copy to the copies array. Based on copyType it will call the appropriate
   *  add method, applying the correct properties.
   *  TODO: This should later be update to take
   *  in an object with all of the appropriate properies for a the copy type.
   * @param {CopyType} copyType - Type of copy
   */
  handleAddCopy = copyType => {
    const serialNum = this.props.generateNewLibraryBookCopySerialNum();
    let copy = {
      serialNum,
      isAvailable: true
    };

    //Choose correct add method
    switch (copyType) {
      case CopyTypes.PAPER: {
        let paperCopy = this.createPaperBookCopy(copy);
        this.setState({
          copies: this.getDeepCloneCopies().concat([paperCopy])
        });
        break;
      }
      case CopyTypes.AUDIO: {
        let audioCopy = this.createAudioBookCopy(copy);
        this.setState({
          copies: this.getDeepCloneCopies().concat([audioCopy])
        });
        break;
      }
      default:
        throw "Copy must have a valid type";
    }
  };

  /**
   * Creates a paper copy.
   * @param {Object} copy - The copy being extended
   */
  createPaperBookCopy = copy => {
    return Object.assign(copy, {
      numPages: 100,
      type: CopyTypes.PAPER
    });
  };

  /**
   * Creates an audio copy.
   * @param {Object} copy - The copy being extended
   */
  createAudioBookCopy = copy => {
    return Object.assign(copy, {
      recordingLength: 100,
      type: CopyTypes.AUDIO
    });
  };

  /**
   * Handles checking out a copy of a book. Selects the first available.
   * @param {CopyType} copyType - The type of copy to be checked out.
   */
  handleCheckoutCopy = copyType => {
    let updatedCopies = this.getDeepCloneCopies();

    const index = this.state.copies.findIndex(
      copy => copy.type === copyType && copy.isAvailable === true
    );

    if (index !== -1) {
      updatedCopies[index].isAvailable = false;
    } else {
      alert("There are no more " + copyType + " copies to be checked out");
    }

    this.setState({ copies: updatedCopies });
  };

  /**
   * Gets a deep clone of the copies array. Keep immutable
   */
  getDeepCloneCopies() {
    return JSON.parse(JSON.stringify(this.state.copies));
  }

  /**
   * Returns the copy of a book and makes it available again.
   * @param {Number} serialNum - The serial number of the book being returned
   */
  handleReturnCopy = serialNum => {
    let updatedCopies = this.getDeepCloneCopies();

    updatedCopies.find(copy => copy.serialNum === serialNum).isAvailable = true;

    this.setState({ copies: updatedCopies });
  };
}

/**
 * Enum for book copy types available.
 */
const CopyTypes = {
  PAPER: "paper",
  AUDIO: "audio"
};

export default LibraryBook;
