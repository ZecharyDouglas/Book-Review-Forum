/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import axios from "axios";
import ShowBooks from "./ShowBooks";
import ReviewForm from "./ReviewForm";

function App() {
  const [bookData, setBookData] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState(1);
  const [userQuery, setUserQuery] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log(selectedValue);

    if (selectedValue == 1) {
      setUserQuery("intitle:");
    }
    if (selectedValue == 2) {
      setUserQuery("inauthor:");
    }
    if (selectedValue == 3) {
      setUserQuery("subject:");
    }
  };

  const handleUserSearch = (e) => {
    const newString = e.target.value.replace(/ /g, "+");

    setUserSearch(newString);
  };

  const getBookData = () => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${userQuery}${userSearch}&maxResults=5`
      )
      .then((response) => {
        setBookData(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReviewClick = () => {
    setShowReviewForm(true);
  };

  const handleCloseForm = () => {
    setShowReviewForm(false);
  };

  useEffect(() => {
    if (bookData.length > 0) {
      setShowReviewForm(false);
    }
  }, [bookData]);

  return (
    <div className="flex justify-start min-h-[2300px] items-center flex-col ">
      {showReviewForm && bookData.length > 0 && (
        <ReviewForm book={bookData[0]} onClose={handleCloseForm} />
      )}

      <div className="flex justify-center items-center flex-col mb-4 w-[1000px]">
        <div className=" flex m-5">
          <p className=" mr-4">Search Options:</p>
          <select id="dropdown" onChange={handleSelectChange}>
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
          className="px-4 py-2 bg-blue-500 text-white border-2 rounded-lg mt-5 focus:outline-none focus:ring-0"
          onClick={getBookData}
        >
          Search
        </button>
      </div>

      {bookData.length > 0 ? (
        <div className={showReviewForm ? "blur" : ""}>
          <ShowBooks bookData={bookData} onReviewClick={handleReviewClick} />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col"></div>
      )}

      {!showReviewForm && bookData.length > 0 && (
        <div className="flex justify-center items-center flex-col">
          Try Reviewing a Book!
        </div>
      )}
    </div>
  );
}

export default App;
