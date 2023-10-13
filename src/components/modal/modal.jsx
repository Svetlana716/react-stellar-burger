import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modals");

const Modal = ({ onClose, children }) => {

    const handleEscClose = React.useCallback ((e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, []);

    React.useEffect(() => {
        document.addEventListener('keydown', handleEscClose);

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }
    }, [handleEscClose]
    );

    return ReactDOM.createPortal(
        (
            <ModalOverlay onClose={onClose} >
                <div onClick={(e) => {e.stopPropagation()}} className={`${styles.modal}`}>
                        <div className={`${styles.closeButton}`} onClick={onClose}>
                            <CloseIcon type="primary" />
                        </div>
                        {children}
                </div>
            </ModalOverlay>
        ),
        modalRoot
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.any,
};

export default Modal;