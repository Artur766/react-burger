import React from 'react';
import styles from "./Order.module.css";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createOrderNumber } from '../../../services/reducers/orderSlice';
import { useSelector, useDispatch } from "../../../services/types/hooks";
import { Loader } from '../../loader/loader';
import { getTotalPrice } from '../../../services/reducers/ingredientsConstructorSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

function Order() {
  const { ingredients, totalPrice, bun } = useSelector(store => store.ingredientsConstructor);
  const { error, orderRequest } = useSelector(store => store.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function handleCreateOrder() {
    if (Cookies.get("token")) {
      const ingredientsId = ingredients.map(item => item._id);
      ingredientsId.push(bun._id);

      dispatch(createOrderNumber(ingredientsId))
    } else {
      localStorage.setItem('redirectPath', location.pathname);
      navigate("/login");
    }
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
        <Button htmlType="button" type="primary" size="large" onClick={handleCreateOrder} disabled={bun.price === 0 ? true : false}>
          Оформить заказ
        </Button>
      </div >
  )
}

export default Order;