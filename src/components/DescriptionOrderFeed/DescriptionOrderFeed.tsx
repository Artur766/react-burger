import React, { FC } from 'react'
import styles from "./DescriptionOrderFeed.module.css"
import { useSelector } from '../../services/types/hooks'

const DescriptionOrderFeed: FC = () => {

  const messageWebSocket = useSelector(store => store.orderFeed.messages);

  return (
    <section className={styles.descriptionList}>
      <div className={styles.wrapper}>
        <div className={styles.readyContainer}>
          <h4 className={styles.title}>Готовы:</h4>
          <div className={styles.listData}>
            {
              messageWebSocket?.orders.map(item => item.status === "done" && (
                <p key={item._id} className={styles.itemReadyData}>{item.number}</p>
              ))
            }
          </div>
        </div>
        <div className={styles.readyContainer}>
          <h4 className={styles.title}>В работе:</h4>
          <div className={styles.listData}>
            {
              messageWebSocket?.orders.map(item => item.status !== "done" && (
                <p key={item._id} className={styles.itemWorkData}>{item.number}</p>
              ))
            }
          </div>
        </div>
      </div>
      <div className={styles.markAllTimeContainer}>
        <h4 className={styles.title}>Выполнено за все время:</h4>
        <p className={styles.dataMark}>{messageWebSocket?.total}</p>
      </div>
      <div className={styles.markTodayContainer}>
        <h4 className={styles.title}>Выполнено за сегодня:</h4>
        <p className={styles.dataMark}>{messageWebSocket?.totalToday}</p>
      </div>
    </section>
  )
}

export default DescriptionOrderFeed;