import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root, { Loader as rootLoader, action as rootAction } from "./Root";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contacts, {
  loader as contactLoader,
  action as contactAction,
} from "./components/Contacts";
import Edit, {
  loader as editLoader,
  action as editAction,
} from "./components/Edit";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";
import Test from "./components/Test";
import Index from "./components/Indec";
// import { App } from "./App";
import { action } from "./components/destory";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    loader: rootLoader(queryClient),
    action: rootAction(queryClient),
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "contacts/:contactId",
        element: <Contacts />,
        loader: contactLoader(queryClient),
        action: contactAction(queryClient),
      },
      {
        path: "contacts/:contactId/edit",
        element: <Edit />,
        loader: editLoader(queryClient),
        action: editAction(queryClient),
      },
      {
        path: "contacts/:contactId/destory",
        element: <Edit />,
        action: action(queryClient),
      },
      {
        path: "/test",
        element: <Test />,
        // loader: contactLoader(queryClient),
        // action: contactAction(queryClient),
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
