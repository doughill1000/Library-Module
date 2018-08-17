import React, { Component } from "react";

class LibraryBookCopy extends Component {
  render() {
    const { serialNum, isAvailable } = this.props.copy;
    let btnReturn;
    if (!isAvailable) {
      btnReturn = (
        <button
          className={"btn btn-warning btn-sm ml-2"}
          onClick={() => this.props.handleReturnCopy(serialNum)}
        >
          Return
        </button>
      );
    }
    return (
      <div className={"m-1"}>
        <span> Serial # {serialNum}</span>{" "}
        <span className={isAvailable ? "text-success" : "text-danger"}>
          {" "}
          {isAvailable ? "Available" : "Checked Out"}
        </span>{" "}
        {btnReturn}
      </div>
    );
  }
}

export default LibraryBookCopy;
