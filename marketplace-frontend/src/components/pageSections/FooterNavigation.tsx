import { Link } from "react-router-dom";
import classes from "./FooterNavigation.module.css";
import layoutClasses from "@/styles/layout.module.css";
import clsx from "clsx";

const FooterNavigation = () => {
  return (
    <footer className={classes.footer}>
      <nav className={clsx(layoutClasses.flex, layoutClasses.flexGrow)}>
        <ul className={layoutClasses.navMenu}>
          <li>
            <Link to="/test">Home</Link>
          </li>
          <li>
            <Link to="/test">Mens</Link>
          </li>
          <li>
            <Link to="/test">Womens</Link>
          </li>
          <li>
            <Link to="/test">Latest releases</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
            <ul className={`${layoutClasses.dropdownMenu} ${classes.dropdownMenuFooter}`}>
              <li>
                <Link to="/test">Menu Item</Link>
              </li>
              <li>
                <Link to="/test">Menu Item</Link>
              </li>
              <li>
                <Link to="/test">Menu Item</Link>
              </li>
              <li>
                <Link to="/test">Menu Item</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default FooterNavigation;
