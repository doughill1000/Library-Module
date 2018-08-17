import React, { Component } from "react";
import Book from "./book";
import LibraryBookCopies from "./libraryBookCopies";

class LibraryBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copies: props.libraryBook.copies
    };
  }

  render() {
    const { book } = this.props.libraryBook;
    const { copies } = this.state;
    return (
      <React.Fragment>
        <div className={"row"}>
          <Book book={book} />
          <div className={"col-12 m-2"}>
            Total Number of Copies: {copies.length}
          </div>
          <LibraryBookCopies
            name={"Paper"}
            copies={this.getCopiesOfType(CopyTypes.PAPER)}
            copyType={CopyTypes.PAPER}
            handleAddCopy={this.handleAddCopy}
            handleCheckoutCopy={this.handleCheckoutCopy}
            handleReturnCopy={this.handleReturnCopy}
          />
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

  getCopiesOfType = copyType => {
    return this.state.copies.filter(copy => copy.type === copyType);
  };

  handleAddCopy = copyType => {
    const serialNum = this.props.generateNewLibraryBookCopySerialNum();
    let copy = {
      serialNum,
      isAvailable: true
    };

    switch (copyType) {
      case CopyTypes.PAPER: {
        this.addPaperBookCopy(copy);
        break;
      }
      case CopyTypes.AUDIO: {
        this.addAudioBookCopy(copy);
        break;
      }
      default:
        throw "Copy must have a valid type";
    }
  };

  /**
   * Add a paper copy
   * @param {Object} copy - The copy being added
   */
  addPaperBookCopy = copy => {
    let paperCopy = Object.assign(copy, {
      numPages: 100,
      type: CopyTypes.PAPER
    });

    this.setState({
      copies: this.getDeepCloneCopies().concat([paperCopy])
    });
  };

  /**
   * Adds an audio copy
   * @param {Object} copy - The copy being added
   */
  addAudioBookCopy = copy => {
    let audioCopy = Object.assign(copy, {
      recordingLength: 100,
      type: CopyTypes.AUDIO
    });

    this.setState({
      copies: this.getDeepCloneCopies().concat([audioCopy])
    });
  };

  handleCheckoutCopy = type => {
    let updatedCopies = this.getDeepCloneCopies();

    const index = this.state.copies.findIndex(
      copy => copy.type === type && copy.isAvailable === true
    );

    if (index !== -1) {
      updatedCopies[index].isAvailable = false;
    } else {
      alert("There are no more " + type + " copies to be checked out");
    }

    this.setState({ copies: updatedCopies });
  };

  getDeepCloneCopies() {
    return JSON.parse(JSON.stringify(this.state.copies));
  }

  //Needs refactor
  handleReturnCopy = serialNum => {
    let updatedCopies = this.getDeepCloneCopies();

    updatedCopies.find(copy => copy.serialNum === serialNum).isAvailable = true;

    this.setState({ copies: updatedCopies });
  };
}

const CopyTypes = {
  PAPER: "paper",
  AUDIO: "audio"
};

export default LibraryBook;
