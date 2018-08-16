// let serialNum = 0;
// export const libraryItem = superclass =>
//   class extends superclass {
//     constructor() {
//       super();
//       this.state = {
//           // Serial num cannot be set, only incremented for new instance
//           serialNum: serialNum = serialNum + 1,
//           isCheckedOut: false
//       }
//     }

//     /**
//      * Gets whether the library item is checked out
//      */
//     get isCheckedOut() {
//       return this._isCheckedOut;
//     }

//     /**
//      * Sets if library item is checked out
//      */
//     set isCheckedOut(value) {
//       if (typeof value !== "boolean") {
//         throw "A valid boolean value must be passed";
//       }
//       this._isCheckedOut = value;
//     }

//     /**
//      * Checks out the library item
//      */
//     checkOut() {
//       if (this._isCheckedOut === true) {
//         throw "Sorry this copy has already been checked out";
//       }
//       this._isCheckedOut = true;

//       return this;
//     }

//     /**
//      * Returns the library item
//      */
//     return() {
//       if (this._isCheckedOut === false) {
//         throw "Sorry this copy is not checked out";
//       }
//       this._isCheckedOut = false;

//       return this;
//     }
//   };

// // export const libraryBook = superclass =>
// //   class extends superclass {
// //     constructor() {
// //       super();
// //     }
// //     /**
// //      * Mixin that extends a class by implementing a get and set for a library book.
// //      * @param {Class} superclass - Class to be extended
// //      */
// //     /**Gets the library book object */
// //     get libraryBook() {
// //       return this._libraryBook;
// //     }

// //     /**Sets the library book object */
// //     set libraryBook(value) {
// //       //   if (value instanceof LibraryBook === false) {
// //       //     throw "A valid libraryBook must be passed ";
// //       //   }
// //       this._libraryBook = value;
// //     }
// //   };
