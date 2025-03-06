import { ReactElement, ReactNode } from "react";
import classes from "./PageContent.module.css";

const PageContent = ({ footer, children }: { children: ReactNode; footer: ReactElement }) => {
  return (
    <div className={classes.pageContents}>
      <div>{children}</div>
      {footer}
    </div>
  );
};

export default PageContent;
