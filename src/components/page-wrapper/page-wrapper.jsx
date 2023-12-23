import styles from "./page-wrapper.module.css";
import PropTypes from "prop-types";

import AppHeader from "../app-header/app-header";

const PageWrapper = ({ children }) => {
    return (
        <div className={styles.wrapper}>
        <AppHeader />
        <main className={styles.content}>
          { children }
        </main>
      </div>
    )
  };

  PageWrapper.propTypes = {
    children: PropTypes.any,
  };

  export default PageWrapper;