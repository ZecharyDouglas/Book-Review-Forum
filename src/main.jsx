import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import "./index.css";
import ReviewForm from "./ReviewForm.jsx";
import ErrorPage from "./Error-Page.jsx";
import ShowPosts from "./ShowPosts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/review",
    element: (
      <>
        <Navbar />
        <ReviewForm />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/userposts",
    element: (
      <>
        <Navbar />
        <ShowPosts />
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className=" bg-stone-200">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
