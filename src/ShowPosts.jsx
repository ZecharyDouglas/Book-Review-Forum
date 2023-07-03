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
              <p className="mb-2">
                <strong className=" text-blue-400">
                  {post.username} said..
                </strong>
              </p>

              <p className="mb-2">
                <strong>Publisher:</strong> {post.date}
              </p>
              <p className="mb-2">
                <strong>Publisher:</strong> {post.body}
              </p>
            </div>
          );
        })}
    </div>
  );
}
