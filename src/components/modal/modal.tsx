import { useEffect } from "react";
import { ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {
    children?: ReactNode;
    onClose: () => void;
};

const modalRoot = document.getElementById("modals") as HTMLDivElement;

const Modal = ({ onClose, children }: Props) => {
    useEffect(() => {
        const handleEscClose = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscClose);

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }
    }, []
    );

    return ReactDOM.createPortal(
        (
            <ModalOverlay onClose={onClose} >
                <div onClick={(e) => { e.stopPropagation() }} className={`${styles.modal}`}>
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

export default Modal;