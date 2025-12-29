import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import DuplicateBlueprintReportPage from "./components/pages/DuplicateBlueprintsReportPage";
import RecentlyAddedBlueprintsReportPage from "./components/pages/RecentlyAddedBlueprintsReportPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/reports/duplicates",
        element: <DuplicateBlueprintReportPage />,
      },
      {
        path: "/reports/most-recent",
        element: <RecentlyAddedBlueprintsReportPage />,
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
