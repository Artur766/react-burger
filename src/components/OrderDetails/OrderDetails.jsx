import React from 'react';
import Modal from '../Modal/Modal';
import styles from "./OrderDetails.module.css";
import checkMark from "../../images/done.svg";
import PropTypes from 'prop-types';

function OrderDetails({ onClose, isOpen }) {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <h2 className={styles.totalPrice}>034536</h2>
      <h3 className={styles.orderIdentifier}>идентификатор заказа</h3>
      <img className={styles.checkMark} src={checkMark} alt="Check Mark" />
      <p className={styles.orderStatus}>Ваш заказ начали готовить</p>
      <p className={styles.orderStatusInactive}>Дождитесь готовности на орбитальной станции</p>
    </Modal >
  )
}

export default OrderDetails;

OrderDetails.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
}