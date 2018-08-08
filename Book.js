/** 
 * Module:      $Book
 * 
 * The book module provides a service and Book class. Books can be created, added, and removed 
 * from a set managed by the service. 
 * 
 * Services:    BookService (singleton)
 * 
 * Classes:     Book
*/

var $Book = (function () {
    //Private variables stored in lexical scope using closures
    let books = new Set();

    /********************
     * Services
     ********************/

    /**
     * Book Service that manages a list of books.
     * */
    class BookService {
        
        /**
         * Adds a book to the book set.
         * @param {Book} book - Book to be added
         */
        addBook(book) {
            if (book instanceof Book === false)
                throw "Error. Not instance of a Book";
            books.add(book);

            return book;
        }

        /**
         * Removes the book from the set by title.
         * @param {String} title - Title of the book to be removed
         */
        removeBook(book) {
            books.forEach(function (b) {
                if (b === book) {
                    var val = books.delete(b);
                    return val;
                }
            })

            return this.getBooks(); 
        }

        /**
         * Returns a book by title
         * @param {any} title
         */
        getBook(title) {
            //Convert set to array and filter for book by title
            return [...books].filter(b => b.title === title)
        }

        /**
         * Return a deep copy of the books array
         * */
        getBooks() {
            return new Set(books);
        }

        /**
         * Returns the num of books in the array
         */
        getNumBooks() {
            return books.size
        } 

        /********************
         * Factory Methods
         ********************/
        createBook(title, author) {
            let book = new Book();
            book.title = title;
            book.author = author;

            return book;
        }
        /********************
         * End Factory Methods
         ********************/
    }  

    /********************
     * End Services
     ********************/

    /********************
     * Classes
     ********************/
    
    /**
     * Class representing a book object
     */
    class Book {
        /*Constructors - See Factory method createBook on LibraryService */

        /**
         * Returns the book's title
         */
        get title() {
            return this._title;
        }

        /**
         * Sets the title of the book
         * value { String } - String value indicating the title of the book
         */
        set title(value) {
            if (typeof value !== 'string') {
                throw "Please enter a valid string"
            }
            if (value.length > 50) {
                throw "Please limit the book title to 50 characters or less"
            }
            this._title = value;
        }

        /**
         * Returns the number of pages
         */
        get author() {
            return this._author;
        }

        /**
         * Sets the number of pages in the book
         * value { Number } - Integer value indicating number of pages
         */
        set author(value) {
            if (typeof value !== 'string') {
                throw "Please enter a valid string for author"
            }
            this._author = value;
        }

    }    
    /********************
     * End Classes
     ********************/

    //Return module as $Book
    return {
        BookSvc: new BookService(), 
        Book: Book 
    }

}());