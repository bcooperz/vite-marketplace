import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "@/routes";
import BrowserRouterErrorBoundary from "./BrowserRouterErrorBoundary";
import PageEffectsWrapper from "./PageEffectsWrapper";
import ErrorBoundary from "./ErrorBoundary";
import App from "@/pages/App";

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

const RouteProvider = () => {
  return <RouterProvider router={router} />;
};

export default RouteProvider;
