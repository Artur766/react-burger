import React from 'react';
import styles from "./Order.module.css";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createOrderNumber } from '../../../services/reducers/orderSlice';
import { useSelector, useDispatch } from "react-redux";
import { Loader } from '../../loader/loader';
import { getTotalPrice } from '../../../services/reducers/ingredientsConstructorSlice';

function Order() {
  const { ingredients, totalPrice, bun } = useSelector(store => store.ingredientsConstructor);
  const { error, orderRequest } = useSelector(store => store.order);
  const dispatch = useDispatch();

  function handleCreateOrder() {
    const ingredientsId = ingredients.map(item => item._id);
    dispatch(createOrderNumber(ingredientsId))
  }

  React.useEffect(() => {
    dispatch(getTotalPrice());
  }, [ingredients, bun.price])

  return (
    orderRequest
      ?
      <Loader size="large" />
      :
      <div className={styles.containerDecoration} >
        {error && <p className={styles.error}>Произошла ошибка: {error}</p>}
        <div className={styles.containerTotalPrice}>
          <p className={styles.totalPrice}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleCreateOrder}>
          Оформить заказ
        </Button>
      </div >
  )
}

export default Order;