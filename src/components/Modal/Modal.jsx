import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from "./Modal.module.css"
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");


function Modal({ title, children, onClose, isOpen }) {
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

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
  title: PropTypes.string
}