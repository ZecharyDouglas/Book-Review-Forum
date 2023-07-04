import axios from "axios";
import React, { useState, useEffect } from "react";
import moreButton from "./UI/moreButton.svg";
import { Button, ButtonGroup } from "@chakra-ui/react";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";

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
    <div className="flex flex-col items-center justify-start h-[2000px]">
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
                <Button size="sm" className="ml-5">
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
              <p className="mb-2 mr-5">{post.body}</p>
            </div>
          );
        })}
    </div>
  );
}
