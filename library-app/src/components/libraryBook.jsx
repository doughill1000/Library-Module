import React, { Component } from "react";
import Book from "./book";
import LibraryBookCopies from "./libraryBookCopies";

class LibraryBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paperCopies: props.libraryBook.paperCopies,
      audioCopies: props.libraryBook.audioCopies,
      totalCopies: 0
    };
  }

  render() {
    const { book } = this.props.libraryBook;
    return (
      <React.Fragment>
        <div className={"row"}>
          <Book book={book} />
          <LibraryBookCopies
            name={"Paper"}
            copies={this.state.paperCopies}
            numCopies={this.state.paperCopies.length}
            copyType={CopyTypes.PAPER}
            handleAddCopy={this.handleAddCopy}
            handleCheckoutCopy={this.handleCheckoutCopy}
            handleReturnCopy={this.handleReturnCopy}
          />
          <LibraryBookCopies
            name={"Audio"}
            copies={this.state.audioCopies}
            numCopies={this.state.audioCopies.length}
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

  getAllCopies = () => {
    const { paperCopies, audioCopies } = this.state;
    return paperCopies.concat(audioCopies); //.concat(...otherCopyTypes)
  };

  handleAddCopy = value => {
    const serialNum = this.props.generateNewLibraryBookCopySerialNum();
    let copy = {
      serialNum,
      isAvailable: true
    };

    switch (value) {
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
    this.setState(prevState => ({ totalCopies: prevState.totalCopies++ }));
  };

  /**
   * Add a paper copy
   * @param {Object} copy - The copy being added
   */
  addPaperBookCopy = copy => {
    let paperCopy = Object.assign(copy, { numPages: 100 });
    this.setState({
      paperCopies: [...this.state.paperCopies, paperCopy]
    });
  };

  /**
   * Adds an audio copy
   * @param {Object} copy - The copy being added
   */
  addAudioBookCopy = copy => {
    let audioCopy = Object.assign(copy, { recordingLength: 100 });
    this.setState({ audioCopies: [...this.state.audioCopies, audioCopy] });
  };

  handleCheckoutCopy = type => {
    let updatedCopies = [];
    switch (type) {
      case CopyTypes.PAPER: {
        updatedCopies = this.checkoutCopy(this.state.paperCopies, type);
        this.setState({ paperCopies: updatedCopies });
        break;
      }
      case CopyTypes.AUDIO: {
        updatedCopies = this.checkoutCopy(this.state.audioCopies, type);
        this.setState({ audioCopies: updatedCopies });
        break;
      }
      default: {
        throw "Please enter a valid type of item to check out";
      }
    }
  };

  checkoutCopy = (copies, type) => {
    let updatedCopies = [...copies];
    const index = copies.findIndex(copy => copy.isAvailable === true);

    if (index !== -1) {
      updatedCopies[index].isAvailable = false;
    } else {
      alert("There are no more " + type + " copies to be checked out");
    }

    return updatedCopies;
  };

  //Needs refactor
  handleReturnCopy = serialNum => {
    let returnCopy = {
      ...this.getAllCopies().find(elem => elem.serialNum === serialNum)
    };

    returnCopy.isAvailable = true;

    this.forceUpdate();
  };
}

const CopyTypes = {
  PAPER: "paper",
  AUDIO: "audio"
};

export default LibraryBook;
