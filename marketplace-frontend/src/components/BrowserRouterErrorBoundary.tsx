import { useRouteError } from "react-router-dom";
import HeaderNavigation from "./pageWrappers/HeaderNavigation";
import PageContent from "./pageWrappers/PageContent";
import FooterNavigation from "./pageWrappers/FooterNavigation";

const BrowserRouterErrorBoundary = () => {
  const error = useRouteError() as { statusText: string; message: string };

  console.error(error);

  return (
    <div id="error-page">
      <HeaderNavigation />
      <PageContent footer={<FooterNavigation />}>
        <div>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error?.statusText || error?.message}</i>
          </p>
        </div>
      </PageContent>
    </div>
  );
};

export default BrowserRouterErrorBoundary;
