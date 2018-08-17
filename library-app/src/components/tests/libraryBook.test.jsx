import React from "react";
import renderer from "react-test-renderer";
import LibraryBook from "../libraryBook";

const libraryBook = {
  book: {
    title: "the book",
    author: "author"
  },
  paperCopies: [],
  audioCopies: []
};

it("Renders library book", () => {
  const component = renderer.create(<LibraryBook libraryBook={libraryBook} />);

  expect(component).toMatchSnapshot();
});
