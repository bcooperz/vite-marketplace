import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "@/styles/normalise.css";
import "@/styles/global/variables.css";
import "@/styles/index.css";
import AppWrapper from "./components/bootstrapComponents/AppWrapper";
import ErrorBoundary from "./components/ErrorBoundary";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <ErrorBoundary>
      <AppWrapper />
    </ErrorBoundary>
  </StrictMode>,
);
