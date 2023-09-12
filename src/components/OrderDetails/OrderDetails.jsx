import React from 'react';
import styles from "./OrderDetails.module.css";
import checkMark from "../../images/done.svg";
import { useSelector } from "react-redux";

function OrderDetails() {
  const { orderNumber } = useSelector(store => store.order);
  return (
    <>
      <h2 className={styles.totalPrice}>{orderNumber}</h2>
      <h3 className={styles.orderIdentifier}>идентификатор заказа</h3>
      <img className={styles.checkMark} src={checkMark} alt="Check Mark" />
      <p className={styles.orderStatus}>Ваш заказ начали готовить</p>
      <p className={styles.orderStatusInactive}>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails;
