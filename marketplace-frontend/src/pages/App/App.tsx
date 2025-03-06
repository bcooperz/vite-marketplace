import "@/components/pageWrappers/styles.css";
import FooterNavigation from "@/components/pageWrappers/FooterNavigation";
import HeaderNavigation from "@/components/pageWrappers/HeaderNavigation";
import PageContent from "@/components/pageWrappers/PageContent";
import { Outlet } from "react-router-dom";

function App() {
  return (
    // todo: Create proper page layout
    <>
      <div>
        <HeaderNavigation />
        <PageContent footer={<FooterNavigation />}>
          <Outlet />
        </PageContent>
      </div>
    </>
  );
}

export default App;
