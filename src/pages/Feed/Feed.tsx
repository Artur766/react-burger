import React, { FC } from 'react';
import styles from "./Feed.module.css";
import OrderFeed from '../../components/OrderFeed/OrderFeed';

const Feed: FC = () => {
  return (
    <>
      <h1 className={styles.title}>Лента заказаов</h1>
      <main className={styles.main}>
        <OrderFeed />
      </main>
    </>
  )
}

export default Feed;