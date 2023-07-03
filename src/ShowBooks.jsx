import React from "react";

export default function ShowBooks({ bookData, onReviewClick }) {
  const handleBookClick = (book) => {
    onReviewClick();
  };

  return (
    <div className="flex justify-center items-center flex-col w-fit">
      {bookData.map((book) => {
        return (
          <div
            key={book.id}
            className="bg-stone-200 p-6 m-4 rounded-lg max-w-md shadow-lg hover:bg-stone-300 cursor-pointer"
            onClick={() => handleBookClick(book)}
          >
            <h2 className="text-lg font-bold mb-4">{book.volumeInfo.title}</h2>
            <p className="mb-2">
              <strong>Authors:</strong> {book.volumeInfo.authors?.join(", ")}
            </p>
            <p className="mb-2">
              <strong>Info Link:</strong>{" "}
              <a
                href={book.volumeInfo.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {book.volumeInfo.infoLink}
              </a>
            </p>
            <p className="mb-2">
              <strong>Page Count:</strong> {book.volumeInfo.pageCount}
            </p>
            <p className="mb-2">
              <strong>Published Date:</strong> {book.volumeInfo.publishedDate}
            </p>
            <p className="mb-2">
              <strong>Publisher:</strong> {book.volumeInfo.publisher}
            </p>
          </div>
        );
      })}
    </div>
  );
}
