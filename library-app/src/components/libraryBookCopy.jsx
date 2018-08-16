import React, { Component } from "react";

class LibraryBookCopy extends Component {
  render() {
    const { serialNum, isAvailable } = this.props.copy;
    return (
      <div>
        <span> Serial # {serialNum}</span>{" "}
        <span className={isAvailable ? "text-success" : "text-danger"}>
          {" "}
          {isAvailable ? "Available" : "Checked Out"}
        </span>
      </div>
    );
  }
}

export default LibraryBookCopy;
