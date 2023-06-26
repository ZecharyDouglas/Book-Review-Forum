/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [bookData, setBookData] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const handleUserSearch = (e) => {
    setUserSearch(e.target.value);
  };

  const getBookData = () => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${userSearch}:keyes&key=AIzaSyDOCTr0pSwfrXwBbSzG3rNX82-LFD-pwf0`
      )
      .then((response) => {
        setBookData(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center flex-col ">
      <div className="flex justify-center items-center flex-col mb-4">
        <input
          type="text"
          name=""
          id=""
          onChange={handleUserSearch}
          placeholder="Search for a category..."
          className="p-2 border border-gray-300 rounded"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white border-2 rounded-lg"
          onClick={getBookData}
        >
          Search
        </button>
      </div>

      {bookData.length > 0 ? (
        <div className="flex justify-center items-center flex-col">
          {bookData.map((book) => {
            return (
              <div
                key={book.id}
                className="bg-slate-500 p-6 m-4 rounded-lg max-w-md shadow-lg"
              >
                <h2 className="text-lg font-bold mb-4">
                  {book.volumeInfo.title}
                </h2>
                <p className="mb-2">
                  <strong>Authors:</strong>{" "}
                  {book.volumeInfo.authors?.join(", ")}
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
                  <strong>Published Date:</strong>{" "}
                  {book.volumeInfo.publishedDate}
                </p>
                <p className="mb-2">
                  <strong>Publisher:</strong> {book.volumeInfo.publisher}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col">
          Loading Please Wait...{" "}
        </div>
      )}
    </div>
  );
}

export default App;
