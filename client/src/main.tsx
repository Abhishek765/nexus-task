import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/User";
import { TaskListProvider } from "./context/TaskList";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <TaskListProvider>
        <App />
      </TaskListProvider>
    </UserProvider>
  </React.StrictMode>
);
