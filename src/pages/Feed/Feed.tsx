import React, { FC } from 'react';
import styles from "./Feed.module.css";
import OrderFeed from '../../components/OrderFeed/OrderFeed';
import DescriptionOrderFeed from '../../components/DescriptionOrderFeed/DescriptionOrderFeed';
import { useSelector, useDispatch } from "../../services/types/hooks";
import { connect } from '../../services/actions/wsActionTypes';

const Feed: FC = () => {
  const dispatch = useDispatch();
  const messageWebSocket = useSelector(store => store.orderFeed.messages)

  React.useEffect(() => {
    dispatch(connect("wss://norma.nomoreparties.space/orders/all"));
  }, [dispatch]);

  return (
    <>
      <h1 className={styles.title}>Лента заказаов</h1>
      <main className={styles.main}>
        <OrderFeed messageWebSocket={messageWebSocket} path="/feed/" localStorageKey="feedOrderModalOpen" />
        <DescriptionOrderFeed />
      </main>
    </>
  )
}

export default Feed;