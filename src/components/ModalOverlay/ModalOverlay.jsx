import React from 'react';
import styles from "./ModalOverlay.module.css";
import PropTypes from 'prop-types';

function ModalOverlay({ children, onClose, isOpen }) {

  function handleOverlayClose(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  React.useEffect(() => {

    function handleEscClose(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [isOpen, onClose])

  return (
    <div className={`${styles.modalOverlay} ${isOpen && styles.open}`} onMouseDown={handleOverlayClose}>
      {children}
    </div>
  )
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node
}