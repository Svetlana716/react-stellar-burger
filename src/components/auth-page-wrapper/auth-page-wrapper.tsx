import { ReactNode } from "react";
import styles from "./auth-page-wrapper.module.css";

type Props = {
  children?: ReactNode;
};

const AuthPageWrapper = ({ children } : Props) => {
  return (
    <div className={styles.authContainer}>
      {children}
    </div>
  )
};

export default AuthPageWrapper;