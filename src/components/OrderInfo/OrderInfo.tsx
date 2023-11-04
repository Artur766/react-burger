import React, { FC } from 'react'
import styles from "./OrderInfo.module.css"
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { getDataOrder, openOrderFeedtModal } from '../../services/reducers/orderFeedSlice';
import { useLocation, useParams } from 'react-router-dom';
import { connect, disconnect } from '../../services/actions/wsActionTypes';

interface IOrderInfo {
  localStorageKey: string;
}

const OrderInfo: FC<IOrderInfo> = ({ localStorageKey }) => {
  const modalOrderFeedVisable = useSelector(store => store.feed.modalVisable);
  const order = useSelector(store => store.feed.currentOrder);
  const sum = useSelector(store => store.feed.sumOrder)
  const createdAt = new Date(order?.createdAt);
  const ingredients = useSelector(store => store.ingredients.ingredients);
  const { id } = useParams();
  const wbMessage = useSelector(store => store.orderFeed.messages);
  const location = useLocation();

  // Функция для подсчета количества каждого ингредиента в заказе
  const countIngredients = (ingredientId: string) => {
    let count = 0;
    order?.ingredients.forEach((ingredient) => {
      if (ingredient === ingredientId) {
        count++;
      }
    });
    return count;
  };

  const modalVisable = useSelector(store => store.feed.modalVisable);

  const dispatch = useDispatch();

  React.useEffect(() => {

    if (location.pathname.includes("feed")) {
      dispatch(connect("wss://norma.nomoreparties.space/orders/all"));

      return () => {
        dispatch(disconnect());
      }
    } else {
      dispatch(connect("wss://norma.nomoreparties.space/orders"));

      return () => {
        dispatch(disconnect());
      }
    }

  }, [dispatch]);

  React.useEffect(() => {

    const currentOrder = wbMessage?.orders.find((item) => item._id === id);
    const sumCurrentOrder = ingredients.reduce((acc, item) => {
      if (currentOrder?.ingredients.includes(item._id)) {
        return acc + item.price;
      }
      return acc;
    }, 0)

    if (!localStorage.getItem(localStorageKey) && modalVisable === false) {
      dispatch(getDataOrder({ item: currentOrder, sum: sumCurrentOrder }));
    }
    else {
      dispatch(openOrderFeedtModal({ item: currentOrder, sum: sumCurrentOrder }));
    }

  }, [modalVisable, wbMessage]);

  return (
    <main className={`${styles.main} ${modalOrderFeedVisable && styles.mainModal}`} >
      <section className={styles.feedDetails}>
        <p className={`${styles.number} ${modalOrderFeedVisable && styles.numberModal}`}>#{order?.number}</p>
        <h4 className={styles.title}>{order?.name}</h4>
        <p className={styles.text}>{order?.status}</p>
        <p className={styles.sostav}>Состав:</p>

        <div className={styles.list}>

          {ingredients.map((ingredient) => {

            const ingredientCount = countIngredients(ingredient._id);

            if (ingredientCount > 0) {
              return (
                <div className={styles.order} key={ingredient._id}>
                  <img src={ingredient.image} alt={ingredient.name} className={styles.image} />
                  <p className={styles.name}>{ingredient.name}</p>
                  <div className={styles.containerSum}></div>
                  <p className={styles.sum}>
                    {ingredientCount} x {ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              );
            }
            return null
          })}

        </div>

        <div className={styles.wrapper}>
          <FormattedDate className={styles.date} date={createdAt} />
          <div className={styles.containerSum}>
            <p className={styles.sum}>{sum}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>

      </section>
    </main>
  )
}

export default OrderInfo;