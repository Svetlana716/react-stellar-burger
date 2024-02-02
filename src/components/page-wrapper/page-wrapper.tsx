import styles from "./page-wrapper.module.css";
import { ReactNode } from "react";
import AppHeader from "../app-header/app-header";

type Props = {
  children?: ReactNode;
};

const PageWrapper = ({ children }: Props) => {
    return (
        <div className={styles.wrapper}>
        <AppHeader />
        <main className={styles.content}>
          { children }
        </main>
      </div>
    )
  };

  export default PageWrapper;