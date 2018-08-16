import React, { Component } from "react";
import LibraryBookCopy from "./libraryBookCopy";

class LibraryBookCopies extends Component {
  state = {
    displayCopies: true
  };
  render() {
    return (
      <React.Fragment>
        <div className={"m-2 col-sm-12"}>
          <a
            href={"javascript:void(0)"}
            onClick={() => this.toggleDisplayCopies()}
          >
            {this.props.name} Copies: {this.props.numCopies}{" "}
          </a>
          <button
            className={"btn btn-success"}
            onClick={() => this.props.addCopy(this.props.copyType)}
          >
            Add Copy
          </button>
          <button
            className={"btn btn-primary"}
            onClick={() => this.props.handleCheckoutCopy(this.props.copyType)}
          >
            Checkout Copy
          </button>
        </div>
        <div
          style={{
            display: this.state.displayCopies ? "inline-block" : "none"
          }}
        >
          <ul>
            {this.props.copies.map((copy, i) => (
              <li key={i}>
                <LibraryBookCopy copy={{ ...copy }} />
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }

  toggleDisplayCopies = () => {
    this.setState({ displayCopies: !this.state.displayCopies });
  };
}

export default LibraryBookCopies;
