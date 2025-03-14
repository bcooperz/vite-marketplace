import FooterNavigation from "@/components/pageSections/FooterNavigation";
import HeaderNavigation from "@/components/pageSections/HeaderNavigation";
import PageContent from "@/components/pageSections/PageContent";
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
