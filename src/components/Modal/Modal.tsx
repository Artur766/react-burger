import React, { FC, ReactNode, KeyboardEvent } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from "./Modal.module.css"
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot: Element | DocumentFragment = document.getElementById("react-modals")!;

interface IModal {
  title?: string,
  children?: ReactNode,
  isOpen: boolean,
  onClose: () => void,
}

const Modal: FC<IModal> = ({ title, children, onClose, isOpen }) => {

  React.useEffect(() => {

    function handleEscClose(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    if (isOpen) {
      // @ts-ignore
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      // @ts-ignore
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [isOpen, onClose])

  return ReactDOM.createPortal(
    (
      <ModalOverlay isOpen={isOpen} onClose={onClose}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h1 className={styles.title}>{title}</h1>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
          {children}
        </div>
      </ModalOverlay>
    ),
    modalRoot
  )
}

export default Modal;
