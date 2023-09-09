import React from 'react';
import styles from "./Order.module.css";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createOrderNumber } from '../../../services/reducers/orderSlice';
import { useSelector, useDispatch } from "react-redux";
import { Loader } from '../../loader/loader';

const totalPriceInitialState = { totalPrice: 0 }

function reducer(state, action) {
  switch (action.type) {
    case "sum":
      return { totalPrice: action.payload }
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function Order() {
  const [totalPrice, totalPriceDispatcher] = React.useReducer(reducer, totalPriceInitialState, undefined);
  const { ingredients } = useSelector(store => store.ingredientsConstructor);
  const { error, orderRequest } = useSelector(store => store.order);

  const dispatch = useDispatch();

  function handleCreateOrder() {
    const ingredientsId = ingredients.map(item => item._id);
    dispatch(createOrderNumber(ingredientsId))
  }

  React.useEffect(() => {
    //Ищем в массиве булку
    const newBun = ingredients.find(elem => elem.type === "bun");
    //Через редюс считаем сумму всех ингредиенитов 
    const sumIngredient = ingredients.reduce((acc, item) => {
      return item.type !== "bun" ? item.price + acc : acc;
    }, 0);
    totalPriceDispatcher({ type: "sum", payload: sumIngredient + (newBun?.price || 0) * 2 });
  }, [ingredients])

  return (
    orderRequest
      ?
      <Loader size="large" />
      :
      <div className={styles.containerDecoration} >
        {error && <p className={styles.error}>Произошла ошибка: {error}</p>}
        <div className={styles.containerTotalPrice}>
          <p className={styles.totalPrice}>{totalPrice.totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleCreateOrder}>
          Оформить заказ
        </Button>
      </div >
  )
}

export default Order;