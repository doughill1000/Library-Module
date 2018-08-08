/** 
 * Module:          $Library
 * 
 * The Library namespace includes a service and several classes that can be 
 * used to create a mock online library. Library books can be created, added, and removed 
 * from a set managed by the service. Library books can have copies added, currently
 * either paper or audio. There is also checkout and return functionality on all 
 * book copies.
 * 
 * Dependencies:    $Mixin - Mixin.js
 *                  $Book - Book.js
 * 
 * Services:        LibraryService (singleton)
 * 
 * Mixins:          libraryItem
 *                  libraryBook
 * 
 * Classes:         LibraryBook
 *                  PaperLibraryBookCopy
 *                  AudioLibraryBookCopy
*/

var $Library = (function ($Mixin, $Book) {
    //Using closure to keep private
    let libraryBooks = new Set()
    //Assign mixin functionality to $Library module
    let module = Object.assign({}, $Mixin);

    /********************
     * Services
     ********************/

    /**
     * Book Service that manages a list of books.
     * */
    class LibraryService {
        /**
         * Adds a Library Book to the list
         * @param {LibraryBook} libraryBook - Library book to add
         */
        addLibraryBook(libraryBook) {
            //Only objects of type book can be added to the array
            if (libraryBook instanceof LibraryBook === false){
                throw "Error. Not instance of a LibraryBook";
            }
            libraryBooks.add(libraryBook);

            return libraryBooks;
        }

        /**
         * Removes the book from the set by title
         * @param {String} title - Title of the book to be removed
         */
        removeLibraryBook(libraryBook) {
            libraryBooks.forEach(function (lb) {
                if (lb === libraryBook) {
                    var val = libraryBooks.delete(lb);
                    return val;
                }
            })

            return libraryBooks; //Allow for method chaining
        }

        /**
         * Returns a book by the passed title
         * @param {String} title - Title of the book
         */
        getLibraryBook(title) {
            //Convert set to array and filter for book by title
            return [...libraryBooks].filter(lb => lb.book.title === title)
        }

        /**
         * Return a deep copy of the books array
         * */
        getLibraryBooks() {
            return new Set(libraryBooks);
        }

        /**
         * Returns the num of books in the array
         */
        getNumBooks() {
            return libraryBooks.size
        }

        /********************
         * Factory Methods
         ********************/
        /**
         * Creates a library book
         * @param {$Book.Book} book - Book that library book is linked to.
         */
        createLibraryBook(book) {
            var obj = new LibraryBook();
            obj.book = book 
            //Contains arrays of all types of book copies. Possible extension could be e-book, etc.
            obj._copies = {
                paper: [],
                audio: []
            }

            return obj;
        }

        /**
         * Creates a paper library book copy
         * @param {LibraryBook} libraryBook - Library book that copy is associated with
         * @param {Number} numPages - Number of pages in paper copy
         */
        createPaperLibraryBookCopy(libraryBook, numPages){
            let copy = new PaperLibraryBookCopy();
            copy.libraryBook = libraryBook;
            copy.numPages = numPages;
            return copy;
        }

        /**
         * Creates an audio library copy
         * @param {LibraryBook} libraryBook - Library book that copy is associated with
         * @param {Number} recordingLength - Recording length of audio copy in minutes
         */
        createAudioLibraryBookCopy(libraryBook, recordingLength) {
            let copy = new AudioLibraryBookCopy();
            copy.libraryBook = libraryBook;
            copy.recordingLength = recordingLength;
            return copy;
        }
        /***********************
         * End Factory Methods
         ***********************/
    }  

    /********************
     * End Services
     ********************/

    /********************
     *  Mixins
     *******************/
    
    //Use a closure to keep serialNum private for libraryItem mixin
    let serialNum = 0;
    module.mixins.libraryItem = superclass => class extends superclass {
        constructor() {
            super();
            // Serial num cannot be set, only incremented for new instance
            this._serialNum = serialNum = serialNum + 1;
            this.isCheckedOut = false;
        }

        /**
         * Returns the serial number of the library book
         */
        get serialNum() {
            return this._serialNum;
        }

        /**
         * Gets whether the library item is checked out
         */
        get isCheckedOut() {
            return this._isCheckedOut;
        }

        /**
         * Sets if library item is checked out
         */
        set isCheckedOut(value) {
            if (typeof value !== 'boolean') {
                throw "A valid boolean value must be passed";
            }
            this._isCheckedOut = value;
        }

        /**
         * Checks out the library item
         */
        checkOut() {
            if (this._isCheckedOut === true) {
                throw "Sorry this copy has already been checked out";
            }
            this._isCheckedOut = true

            return this;
        }

        /**
         * Returns the library item
         */
        return() {
            if (this._isCheckedOut === false) {
                throw "Sorry this copy is not checked out";
            }
            this._isCheckedOut = false

            return this;
        }

    }    

    /**
     * Mixin that extends a class by implementing a get and set for a library book.
     * @param {Class} superclass - Class to be extended
     */
    module.mixins.libraryBook = superclass => class extends superclass {
        /**Gets the library book object */
        get libraryBook(){
            return this._libraryBook;
        }

        /**Sets the library book object */
        set libraryBook(value){
            if(value instanceof LibraryBook === false){
                throw "A valid libraryBook must be passed "
            }
            this._libraryBook = value;
        }
    }
    /********************
     * End Mixins
     *******************/

    /********************
     * Classes
     *******************/

    /**
     * Class representing a Library Book
     */
    class LibraryBook {
        /*Constructors - See Factory method createLibraryBook on LibraryService */

        /**
         * Used to access the copy arrays in a LibraryBook instance. 
         * Accesses the array associated with the given class type
         * @param {String} className - The name of the array type
         */
        getCopyArray(className) {
            switch (className) {
                case "PaperLibraryBookCopy":
                case "paper": {
                    return this._copies.paper;
                }
                case "AudioLibraryBookCopy":
                case "audio": {
                    return this._copies.audio;
                }
                default: {
                    throw "Please enter a valid copy type";
                }
            }
        }

        /**
         * Gets all of the copies from all copy arrays.
         */
        get allCopies() {
            let arr = [];
            //Iterate over all of the arrays in the _copies object
            for (var prop in this._copies) {
                arr = arr.concat(this._copies[prop]);
            }

            return arr;
        }
         
        /**
         * Gets an array of all paper copies for a book.
         */
        get paperCopies() {
            return this.getCopyArray.bind(this, "paper")();
        }

        /**
         * Gets an array of all audio copies for a book.
         */
        get audioCopies() {
            return this.getCopyArray.bind(this, "audio")();
        }

        /**
         * Returns the book object
         */
        get book() {
            return this._book;
        }

        /**
         * Sets the book object
         */
        set book(value) {
            if (value instanceof $Book.Book === false) {
                throw "A valid book must be passed";
            }
            this._book = value;
        }

        /**
         * Gets the total number of copies from all copy arrays
         */
        getTotalNumCopies() {
            let length = 0;
            for (var prop in this._copies) {
                length += this._copies[prop].length;
            }
            return length;
        }

        /**
         * Add a copy to the appropriate copy array.
         * @param {LibraryItem} value - The copy being added
         */
        addCopy(value) {
            //Uses obj class name to add it to correct array
            var ret = this.getCopyArray.bind(this)(value.constructor.name);
            ret.push(value);
        }

        /**
         * Remove a copy from the appropriate copy array.
         * @param {LibraryItem} value - The copy being removed
         */
        removeCopy(value) {
            //Uses obj class name to remove it from correct array
            let arr = this.getCopyArray.bind(this)(value.constructor.name);
            arr = arr.filter(c => c !== value);
        }
    }
    
    /**
     * Class representing a paper library copy
     */
    class PaperLibraryBookCopy extends module.mix('libraryItem', 'libraryBook') {
        /*Constructors - See Factory method createPaperLibraryBookCopy on LibraryService */

        /**
         * Get the number of pages for the paper copy.
         */
        get numPages() {
            return this._numPages;
        }

        /**
         * Sets the number of pages for the paper copy.
         */
        set numPages(value) {
            if (typeof value !== 'number') {
                throw "Please enter a number for number of pages"
            }
            this._numPages = value;
        }
    }

    /**
     * Class representing an aduio library copy.
     */
    class AudioLibraryBookCopy extends module.mix('libraryItem', 'libraryBook') {
        /*Constructors - See Factory method createAudioLibraryBookCopy on LibraryService */

        /**
         * Gets the recording length for an audio copy
         */
        get recordingLength() {
            return this._recordingLength;
        }

        /**
         * Sets the recording length for an audio copy
         */
        set recordingLength(value) {
            if (typeof value !== 'number') {
                throw "Please enter a number for recordingLength"
            }
            this._recordingLength = value;
        }
    }

    /********************
     * End Classes
     ********************/

    //Return module as $Library
    return Object.assign(module, {
       LibrarySvc: new LibraryService(), 
       LibraryBook: LibraryBook,
       PaperLibraryBookCopy: PaperLibraryBookCopy,
       AudioLibraryBookCopy: AudioLibraryBookCopy,
    })

}($Mixin, $Book));