import React, { FC } from 'react'
import styles from "./DescriptionOrderFeed.module.css"

const DescriptionOrderFeed: FC = () => {
  return (
    <section className={styles.descriptionList}>
      <div className={styles.wrapper}>
        <div className={styles.readyContainer}>
          <h4 className={styles.title}>Готовы:</h4>
          <div className={styles.listData}>
            <p className={styles.itemReadyData}>034533</p>
            <p className={styles.itemReadyData}>034532</p>
            <p className={styles.itemReadyData}>034532</p>
            <p className={styles.itemReadyData}>034532</p>
            <p className={styles.itemReadyData}>034532</p>
          </div>
        </div>
        <div className={styles.readyContainer}>
          <h4 className={styles.title}>В работе:</h4>
          <div className={styles.listData}>
            <p className={styles.itemWorkData}>034538</p>
            <p className={styles.itemWorkData}>034541</p>
            <p className={styles.itemWorkData}>034542</p>
          </div>
        </div>
      </div>
      <div className={styles.markAllTimeContainer}>
        <h4 className={styles.title}>Выполнено за все время:</h4>
        <p className={styles.dataMark}>28 752</p>
      </div>
      <div className={styles.markTodayContainer}>
        <h4 className={styles.title}>Выполнено за сегодня:</h4>
        <p className={styles.dataMark}>138</p>
      </div>
    </section>
  )
}

export default DescriptionOrderFeed;