import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import "./index.css";
import ReviewForm from "./ReviewForm.jsx";
import ErrorPage from "./Error-Page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/review",
    element: <ReviewForm />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <div className=" bg-stone-200">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
