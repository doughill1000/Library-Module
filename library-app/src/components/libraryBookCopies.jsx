import React, { Component } from "react";
import LibraryBookCopy from "./libraryBookCopy";

/**
 * LibraryBooksCopies Component
 *
 * Displays a list of library book copies
 */
class LibraryBookCopies extends Component {
  state = {
    displayCopies: true
  };
  render() {
    const { name, copies, copyType } = this.props;
    return (
      <React.Fragment>
        <div className={"m-2 col-sm-12"}>
          <a
            href={"javascript:void(0)"}
            onClick={() => this.toggleDisplayCopies()}
          >
            {name} Copies: {copies.length}{" "}
          </a>
          <button
            className={"btn btn-success m-1"}
            onClick={() => this.props.handleAddCopy(copyType)}
          >
            Add Copy
          </button>
          <button
            className={"btn btn-primary m-1"}
            onClick={() => this.props.handleCheckoutCopy(copyType)}
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
            {copies.map((copy, i) => (
              <li key={i} className={""}>
                <LibraryBookCopy
                  copy={{ ...copy }}
                  handleReturnCopy={this.props.handleReturnCopy}
                />
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }

  /**
   * Toggles whether to display the copies list
   */
  toggleDisplayCopies = () => {
    this.setState({ displayCopies: !this.state.displayCopies });
  };
}

export default LibraryBookCopies;
