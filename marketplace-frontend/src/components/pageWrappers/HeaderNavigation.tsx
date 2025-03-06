import { Link } from "react-router-dom";
import classes from "./HeaderNavigation.module.css";
import useRegisterLoginModalFlow from "@/hooks/useRegisterLoginModalFlow";

const HeaderNavigation = () => {
  const { RegisterComponent } = useRegisterLoginModalFlow();

  return (
    <header className={classes.header}>
      <nav className="flex flexGrow">
        <ul className="navMenu flexSpaceBetween flexGrow">
          <div className="flex">
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
              <ul className="dropdownMenu">
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
          </div>
          <div className="flex">
            <li>
              <Link to="/test">Login</Link>
            </li>
            <li>{<RegisterComponent />}</li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNavigation;
