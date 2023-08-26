import React from 'react';
import styles from "./ModalOverlay.module.css";
import PropTypes from 'prop-types';

function ModalOverlay({ children, onClose, isOpen }) {

  function handleOverlayClose(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

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