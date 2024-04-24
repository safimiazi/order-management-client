import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard.jsx";
import CustomerList from "./Pages/CustomerList.jsx";
import TransactionRecords from "./Pages/TransactionRecords.jsx";
import Root from "./Root/Root.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/customer-list",
        element: <CustomerList />,
      },
      {
        path: "/transaction-records",
        element: <TransactionRecords />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
