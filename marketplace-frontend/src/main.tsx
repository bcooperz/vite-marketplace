import { createRoot } from "react-dom/client";
import App from "./pages/App/index.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import BrowserRouterErrorBoundary from "./components/BrowserRouterErrorBoundary.tsx";
import PageEffectsWrapper from "./components/PageEffectsWrapper.tsx";
import routes from "./routes.tsx";
import { ModalProvider } from "./context/ModalContext.tsx";
import { StrictMode } from "react";
import "@/styles/normalise.css";
import "@/styles/global/variables.css";
import "@/styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <BrowserRouterErrorBoundary />,
    children: routes.map(({ path, pageTitle, element }) => {
      return {
        path,
        errorElement: <h1>Page error</h1>,
        element: (
          <PageEffectsWrapper pageName={pageTitle}>
            <ErrorBoundary>{element}</ErrorBoundary>
          </PageEffectsWrapper>
        ),
      };
    }),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </ErrorBoundary>
  </StrictMode>,
);
