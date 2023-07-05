import axios from "axios";
import React, { useState, useEffect } from "react";
import moreButton from "./UI/moreButton.svg";
import { Button, ButtonGroup } from "@chakra-ui/react";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import { FormControl } from "@chakra-ui/react";

export default function ShowPosts() {
  const [postData, setPostData] = useState();
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/comments",
    }).then((res) => setPostData(res.data));

    console.table(postData);
  }, [deleted]);

  function deletePost(params) {
    event.preventDefault();
    axios.delete(`http://localhost:3000/comments/${params}`).then((res) => {
      console.log(res);
    });
    setDeleted(true);
    setTimeout(() => {
      setDeleted(false);
    }, 2500);
  }

  return (
    <div className="flex flex-col items-center justify-start h-[2000px]">
      {deleted && (
        <h1 className="text-green-500 flex justify-center text-3xl">
          Post was sucessfully deleted
        </h1>
      )}
      {postData &&
        postData.map((post) => {
          return (
            <div
              key={post.id}
              className="bg-stone-200 p-10 mt-20 m-4 rounded-lg max-w-md shadow-lg hover:bg-stone-300 cursor-pointer"
              // onClick={() => handlepostClick(post)} // Call handlepostClick when a post is clicked
            >
              <div className="flex justify-end">
                <Button size="sm">Edit</Button>
                <Button
                  size="sm"
                  className="ml-5"
                  onClick={() => deletePost(post.id)}
                >
                  <UseAnimations animation={trash2} size={30} />
                </Button>
              </div>

              <p className="mb-2">
                <strong className=" text-blue-400">
                  {post.username} said..
                </strong>
              </p>

              <p className="mb-2">
                <strong>{post.date}</strong>
              </p>
              <FormControl>
                <textarea
                  readOnly={true}
                  className="rounded-md bg-stone-200 focus:outline-none focus:ring-0"
                  value={post.body}
                  name="userReview"
                  id="userReview"
                  cols="50"
                  rows="10"
                ></textarea>
              </FormControl>
            </div>
          );
        })}
    </div>
  );
}
