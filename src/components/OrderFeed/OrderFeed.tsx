import React from 'react'
import styles from "./OrderFeed.module.css";
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

function OrderFeed() {
  const navigate = useNavigate();

  const today = new Date()
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1,
    today.getHours(),
    today.getMinutes() - 1,
    0,
  )

  function handleClickCard() {
    navigate(`/feed/lala`);
  }

  return (
    <section className={styles.section}>
      <div className={styles.orderList}>

        <div className={styles.order} onClick={handleClickCard}>
          <div className={styles.containerDate}>
            <p className={styles.numberOrder}>#034535</p>
            <FormattedDate className={styles.date} date={yesterday} />
          </div>
          <p className={styles.description}>Death Star Starship Main бургер</p>
          <div className={styles.wrapper}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
            </div>
            <div className={styles.containerSum}>
              <p className={styles.sumOrder}>470</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>

        <div className={styles.order}>
          <div className={styles.containerDate}>
            <p className={styles.numberOrder}>#034535</p>
            <FormattedDate className={styles.date} date={yesterday} />
          </div>
          <p className={styles.description}>Death Star Starship Main бургер</p>
          <div className={styles.wrapper}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
            </div>
            <div className={styles.containerSum}>
              <p className={styles.sumOrder}>470</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>

        <div className={styles.order}>
          <div className={styles.containerDate}>
            <p className={styles.numberOrder}>#034535</p>
            <FormattedDate className={styles.date} date={yesterday} />
          </div>
          <p className={styles.description}>Death Star Starship Main бургер</p>
          <div className={styles.wrapper}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
            </div>
            <div className={styles.containerSum}>
              <p className={styles.sumOrder}>470</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>


        <div className={styles.order}>
          <div className={styles.containerDate}>
            <p className={styles.numberOrder}>#034535</p>
            <FormattedDate className={styles.date} date={yesterday} />
          </div>
          <p className={styles.description}>Death Star Starship Main бургер</p>
          <div className={styles.wrapper}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
              <img className={styles.image} src="" alt="" />
            </div>
            <div className={styles.containerSum}>
              <p className={styles.sumOrder}>470</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default OrderFeed;