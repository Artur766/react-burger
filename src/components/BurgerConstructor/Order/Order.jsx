import React from 'react';
import styles from "./Order.module.css";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function Order({ onClick }) {
  return (
    <div className={styles.containerDecoration} >
      <div className={styles.containerTotalPrice}>
        <p className={styles.totalPrice}>610</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={onClick}>
        Оформить заказ
      </Button>
    </div>
  )
}

export default Order;
