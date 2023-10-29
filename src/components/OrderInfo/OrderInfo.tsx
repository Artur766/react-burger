import React, { FC } from 'react'
import styles from "./OrderInfo.module.css"
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/types/hooks';

const OrderInfo: FC = () => {

  const modalOrderFeedVisable = useSelector(store => store.feed.modalVisable);


  const today = new Date()
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1,
    today.getHours(),
    today.getMinutes() - 1,
    0,
  )
  return (
    <main className={`${styles.main} ${modalOrderFeedVisable && styles.mainModal}`} >
      <section className={styles.feedDetails}>
        <p className={`${styles.number} ${modalOrderFeedVisable && styles.numberModal}`}>#034533</p>
        <h4 className={styles.title}>Black Hole Singularity острый бургер</h4>
        <p className={styles.text}>Выполнен</p>
        <p className={styles.sostav}>Состав:</p>
        <div className={styles.list}>

          <div className={styles.order}>
            <img src="" alt="" className={styles.image} />
            <p className={styles.name}>Флюоресцентная булка R2-D3</p>
            <div className={styles.containerSum}>
              <p className={styles.sum}>2 x 20</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>

          <div className={styles.order}>
            <img src="" alt="" className={styles.image} />
            <p className={styles.name}>Флюоресцентная булка R2-D3</p>
            <div className={styles.containerSum}>
              <p className={styles.sum}>2 x 20</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>

          <div className={styles.order}>
            <img src="" alt="" className={styles.image} />
            <p className={styles.name}>Флюоресцентная булка R2-D3</p>
            <div className={styles.containerSum}>
              <p className={styles.sum}>2 x 20</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>

          <div className={styles.order}>
            <img src="" alt="" className={styles.image} />
            <p className={styles.name}>Флюоресцентная булка R2-D3</p>
            <div className={styles.containerSum}>
              <p className={styles.sum}>2 x 20</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>


          <div className={styles.order}>
            <img src="" alt="" className={styles.image} />
            <p className={styles.name}>Флюоресцентная булка R2-D3</p>
            <div className={styles.containerSum}>
              <p className={styles.sum}>2 x 20</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>

        </div>

        <div className={styles.wrapper}>
          <FormattedDate className={styles.date} date={yesterday} />
          <div className={styles.containerSum}>
            <p className={styles.sum}>510</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>

      </section>
    </main>
  )
}

export default OrderInfo;