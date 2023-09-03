import React from 'react';
import styles from "./Order.module.css";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsContext } from '../../../context/IngredientsContext';
import { createOrder } from '../../../utils/Api';
import PropTypes from 'prop-types';

function Order({ onOpenModal, totalPrice, setOrderNumber }) {
  const { ingredients } = React.useContext(IngredientsContext);
  const [error, setError] = React.useState(null);

  function handleCreateOrder() {
    const ingredientsId = ingredients.map(item => item._id);
    createOrder(ingredientsId)
      .then(res => {
        onOpenModal();
        setOrderNumber(res.order.number);
      })
      .catch(err => setError(err))
  }

  return (
    <div className={styles.containerDecoration} >
      {error && <p className={styles.error}>Произошла ошибка: {error}</p>}
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

Order.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  setOrderNumber: PropTypes.func.isRequired,
  totalPrice: PropTypes.shape({ totalPrice: PropTypes.number.isRequired }),
}