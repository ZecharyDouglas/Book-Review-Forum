/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import axios from "axios";
import ShowBooks from "./ShowBooks";

function App() {
  const [bookData, setBookData] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState();
  const [userQuery, setUserQuery] = useState("");
  // build out the query string in a function

  // move the search bar and display into a different component
  // build out a form for the user to review the book

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption);
    console.log(typeof selectedOption);
    switch (+selectedOption) {
      case 3:
        setUserQuery("intitle:");

        break;
      case 1:
        setUserQuery("inauthor:");

        break;
      case 2:
        setUserQuery("subject:");

        break;

      default:
        break;
    }
    console.log(userQuery);
  };
  const handleUserSearch = (e) => {
    const newString = e.target.value.replace(/ /g, "+");
    setUserSearch(newString);
  };

  const getBookData = () => {
    let urlLink = `https://www.googleapis.com/books/v1/volumes?q=${userQuery}${userSearch}`;
    //                 https://www.googleapis.com/books/v1/volumes?q=intitle:Harry+Potter

    console.log(urlLink);
    axios
      .get(urlLink)
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
        <div className=" flex m-5">
          <p className=" mr-4">Search Options:</p>
          <select value={selectedOption} onChange={handleSelectChange}>
            <option value={0}>Select an option</option>
            <option value={1}>Title</option>
            <option value={2}>Author</option>
            <option value={3}>Subject</option>
          </select>
        </div>

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
        <ShowBooks bookData={bookData} />
      ) : (
        <div className="flex justify-center items-center flex-col">
          Loading Please Wait...{" "}
        </div>
      )}
    </div>
  );
}

export default App;
