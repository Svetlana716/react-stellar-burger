import styles from "../modal-overlay/modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({onClose, children}) => {
    return (
        <div className={`${styles.overlay}`} onClick={onClose}>
          {children}
        </div>
    )
  };

  ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  export default ModalOverlay;