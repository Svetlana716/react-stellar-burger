import styles from "./auth-page-wrapper.module.css";
import PropTypes from "prop-types";

const AuthPageWrapper = ({ children }) => {
  return (
    <div className={styles.authContainer}>
      {children}
    </div>
  )
};

AuthPageWrapper.propTypes = {
  children: PropTypes.any,
};

export default AuthPageWrapper;