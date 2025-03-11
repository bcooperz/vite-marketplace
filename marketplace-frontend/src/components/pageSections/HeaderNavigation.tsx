import { Link } from "react-router-dom";
import classes from "./HeaderNavigation.module.css";
import useRegisterLoginModalFlow from "@/hooks/useRegisterLoginModalFlow";
import styles from "@/styles/layout.module.css";

const HeaderNavigation = () => {
  const { RegisterComponent } = useRegisterLoginModalFlow();

  return (
    <header className={classes.header}>
      <nav className={styles.flex + " " + styles.flexGrow}>
        <ul className={`${styles.navMenu} ${styles.flexSpaceBetween} ${styles.flexGrow}`}>
          <div className={styles.flex}>
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
              <ul className={styles.dropdownMenu}>
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
          <div className={styles.flex}>
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
