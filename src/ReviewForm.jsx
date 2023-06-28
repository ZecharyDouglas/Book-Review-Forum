import React from "react";

export default function ReviewForm({ userReview, book }) {
  return (
    <div className="flex flex-col items-center">
      <form action="">
        <fieldset></fieldset>
        <fieldset>
          <label htmlFor="userReview"></label>
          <input type="text" id="userReview" width={2 / 3} />
        </fieldset>
      </form>
    </div>
  );
}
