import type { ReactNode } from "react";
import { useEffect } from "react";

const useUpdatePageTitle = ({ pageName }: { pageName: string }) => {
  useEffect(() => {
    document.title = pageName;
  }, [pageName]);
};

const PageEffectsWrapper = ({ pageName, children }: { pageName: string; children: ReactNode }) => {
  useUpdatePageTitle({ pageName });

  return children;
};

export default PageEffectsWrapper;
