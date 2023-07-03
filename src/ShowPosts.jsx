import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ShowPosts() {
  const [postData, setPostData] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/comments",
    }).then((res) => setPostData(res.data));

    console.table(postData);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {postData &&
        postData.map((post) => {
          return (
            <div
              key={post.id}
              className="bg-stone-200 p-6 m-4 rounded-lg max-w-md shadow-lg hover:bg-stone-300 cursor-pointer"
              // onClick={() => handlepostClick(post)} // Call handlepostClick when a post is clicked
            >
              <h2 className="text-lg font-bold mb-4">
                {post.volumeInfo.title}
              </h2>
              <p className="mb-2">
                <strong>Authors:</strong> {post.volumeInfo.authors?.join(", ")}
              </p>
              <p className="mb-2">
                <strong>Info Link:</strong>{" "}
                <a
                  href={post.volumeInfo.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {post.volumeInfo.infoLink}
                </a>
              </p>
              <p className="mb-2">
                <strong>Page Count:</strong> {post.volumeInfo.pageCount}
              </p>
              <p className="mb-2">
                <strong>Published Date:</strong> {post.volumeInfo.publishedDate}
              </p>
              <p className="mb-2">
                <strong>Publisher:</strong> {post.volumeInfo.publisher}
              </p>
            </div>
          );
        })}
    </div>
  );
}
