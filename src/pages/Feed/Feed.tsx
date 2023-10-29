import React, { FC } from 'react';
import styles from "./Feed.module.css";
import OrderFeed from '../../components/OrderFeed/OrderFeed';
import DescriptionOrderFeed from '../../components/DescriptionOrderFeed/DescriptionOrderFeed';
import { useSelector, useDispatch } from "../../services/types/hooks";
import { connect } from '../../services/actions/wsActionTypes';

const Feed: FC = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector(store => store.orderFeed)

  React.useEffect(() => {
    dispatch(connect("wss://norma.nomoreparties.space/orders/all"))
    console.log(messages);
  }, [messages])

  return (
    <>
      <h1 className={styles.title}>Лента заказаов</h1>
      <main className={styles.main}>
        <OrderFeed path="/feed/" localStorageKey="feedOrderModalOpen" />
        <DescriptionOrderFeed />
      </main>
    </>
  )
}

export default Feed;