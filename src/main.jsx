import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { I18nextProvider } from "react-i18next";
import "./index.css";
import i18n from "../i18n.js";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);    
