import styles from "../modal-overlay/modal-overlay.module.css";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  onClose: () => void;
};

const ModalOverlay = ({onClose, children}: Props) => {
    return (
        <div className={`${styles.overlay}`} onClick={onClose}>
          {children}
        </div>
    )
  };

  export default ModalOverlay;