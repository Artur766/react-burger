import React from 'react';
import styles from "./Order.module.css";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsContext } from '../../../context/IngredientsContext';
import { createOrder } from '../../../utils/Api';

function Order({ onOpenModal, totalPrice, setOrderNumber }) {
  const { ingredients } = React.useContext(IngredientsContext);

  function handleCreateOrder() {
    const ingredientsId = ingredients.map(item => item._id);
    createOrder(ingredientsId)
      .then(res => {
        onOpenModal();
        setOrderNumber(res.order.number);
      })
  }

  return (
    <div className={styles.containerDecoration} >
      <div className={styles.containerTotalPrice}>
        <p className={styles.totalPrice}>{totalPrice.totalPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={handleCreateOrder}>
        Оформить заказ
      </Button>
    </div>
  )
}

export default Order;
