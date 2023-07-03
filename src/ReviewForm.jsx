import axios from "axios";
import React from "react";
import { useState } from "react";
export default function ReviewForm({ book }) {
  const [userReview, setuserReview] = useState();
  const handleInputChange = (e) => {
    setuserReview(e.target.value);
  };
  const [getLength, setgetLength] = useState();

  const handleAddJobFormSubmit = async (e) => {
    try {
      await axios
        .get("http://localhost:3000/comments")
        .then((res) => setgetLength(res.data.length));
      await axios({
        method: "post",
        url: "http://localhost:3000/comments",
        data: {
          body: userReview,
          bookId: book.volumeInfo.industryIdentifiers[0].identifier,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleAddJobFormSubmit}
      className=" bg-slate-200 rounded-md p-6 w-500 selection:bg-blue-200 flex flex-col gap-2 shadow-lg m-6"
    >
      <h1 className="flex justify-center">
        Add Book Review for&nbsp;{" "}
        <span className="text-blue-300">{book.volumeInfo.title}</span>
      </h1>

      <fieldset className="flex flex-col">
        <textarea
          className=" rounded-md"
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
        className="bg-blue-500 hover:bg-blue-600 text-white transition mt-4 py-2 cursor-pointer "
        type="submit"
      ></input>
    </form>
  );
}
