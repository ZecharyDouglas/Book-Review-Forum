import axios from "axios";
import React, { useState, useEffect } from "react";
import CloseButton from "./UI/CloseButton.png";

export default function ReviewForm({ book, onClose }) {
  const [userReview, setUserReview] = useState("");
  const [userName, setUserName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleInputChange = (e) => {
    setUserReview(e.target.value);
  };

  const handleAddPostFormSubmit = async (e) => {
    e.preventDefault();
    const dateTime = new Date();

    try {
      await axios.get("http://localhost:3000/comments");
      await axios.post("http://localhost:3000/comments", {
        username: userName,
        date: dateTime,
        bookId: book.volumeInfo.industryIdentifiers[0].identifier,
        body: userReview,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose(); // Close the review form
      }, 2000);
      onClose(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleAddPostFormSubmit}
      className="bg-slate-200 rounded-md p-6 w-500 selection:bg-blue-200 flex flex-col gap-2 shadow-lg m-6"
    >
      <div className="flex justify-end">
        <button onClick={onClose}>
          <img src={CloseButton} alt="A close button" />
        </button>
      </div>
      {submitted && (
        <div className=" text-green-500 flex justify-center">
          Submission successful! Thanks for sharing :D
        </div>
      )}

      <h1 className="flex justify-center">
        Add Book Review for&nbsp;{" "}
        <span className="text-blue-300">{book.volumeInfo.title}</span>
      </h1>

      <fieldset className="flex flex-col">
        <label htmlFor="userName"></label>
        <input
          className="rounded-lg"
          id="userName"
          placeholder="Enter your name here..."
          onChange={handleUserName}
          type="text"
        />
      </fieldset>

      <fieldset className="flex flex-col">
        <textarea
          className="rounded-md"
          onChange={handleInputChange}
          value={userReview}
          name="userReview"
          id="userReview"
          cols="70"
          rows="10"
          placeholder="Enter your review here...."
        ></textarea>
      </fieldset>

      <input
        className="bg-blue-500 hover:bg-blue-600 text-white transition mt-4 py-2 cursor-pointer"
        type="submit"
        value="Submit"
      />
    </form>
  );
}
