import axios from "axios";
import React, { useState, useEffect } from "react";
import moreButton from "./UI/moreButton.svg";
import { Button, ButtonGroup } from "@chakra-ui/react";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import { FormControl } from "@chakra-ui/react";

export default function ShowPosts() {
  const [postData, setPostData] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [postBody, setPostBody] = useState("");
  const [editState, setEditState] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/comments").then((res) => {
      setPostData(res.data);
      console.table(res.data);
    });
  }, [deleted, updated]);

  function deletePost(id) {
    axios.delete(`http://localhost:3000/comments/${id}`).then((res) => {
      console.log(res);
      setDeleted(true);
    });
    setTimeout(() => {
      setDeleted(false);
    }, 2500);
  }

  function editPost(id, body) {
    setEditState(!editState);
    if (editState) {
      setEditingPostId(id);
      setPostBody(body);
    } else setEditingPostId(null);
  }

  function handlePostEdit(e) {
    setPostBody(e.target.value);
  }
  const updatePost = () => {
    try {
      axios({
        method: "patch",
        url: `http://localhost:3000/comments/${editingPostId}`,
        data: { body: postBody },
      }).then((res) => {
        console.log(res);
        setUpdated(true);
        setEditingPostId(null);
        setPostBody("");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-[2000px]">
      {deleted && (
        <h1 className="text-green-500 flex justify-center text-xl mt-10">
          Post was sucessfully deleted
        </h1>
      )}
      {postData &&
        postData
          .slice()
          .reverse()
          .map((post) => {
            return (
              <div
                key={post.id}
                className="bg-stone-200 p-10 mt-20 m-4 rounded-lg max-w-md shadow-lg hover:bg-stone-300 cursor-pointer"
              >
                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      editPost(post.id, post.body);
                    }}
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    className="ml-5"
                    onClick={() => deletePost(post.id)}
                  >
                    <UseAnimations animation={trash2} size={20} />
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
                  {editingPostId === post.id ? (
                    <textarea
                      className="rounded-md bg-stone-200 focus:outline-none focus:ring-0"
                      value={postBody}
                      onChange={handlePostEdit}
                      name="userReview"
                      id="userReview"
                      cols="50"
                      rows="10"
                    ></textarea>
                  ) : (
                    <p>{post.body}</p>
                  )}
                </FormControl>
                {editingPostId === post.id ? (
                  <div className="flex justify-center">
                    <Button onClick={updatePost} colorScheme="teal" size="sm">
                      Update Post
                    </Button>
                  </div>
                ) : null}
              </div>
            );
          })}
    </div>
  );
}
