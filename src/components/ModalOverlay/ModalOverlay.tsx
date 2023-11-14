import React, { FC, ReactNode } from 'react';
import styles from "./ModalOverlay.module.css";

interface IModalOverlay {
  isOpen: boolean,
  onClose: () => void,
  children?: ReactNode,
}

const ModalOverlay: FC<IModalOverlay> = ({ children, onClose, isOpen }) => {

  function handleOverlayClose(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div data-testid="modal-overlay" className={`${styles.modalOverlay} ${isOpen && styles.open}`} onMouseDown={handleOverlayClose}>
      {children}
    </div>
  )
}

export default ModalOverlay;
