import React, { FC } from 'react'
import styles from "./OrderFeed.module.css";
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { openOrderFeedtModal } from '../../services/reducers/orderFeed';

interface IOrderFeed {
  path: "/feed/" | "/profile/history-orders/",
  localStorageKey: "feedOrderModalOpen" | "feedOrderProfileModalOpen",
  width?: string
}

const OrderFeed: FC<IOrderFeed> = ({ path, localStorageKey, width }) => {
  const navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();
  const modalVisable = useSelector(store => store.feed.modalVisable);

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
    dispatch(openOrderFeedtModal())

    navigate(path, { state: { background: location } });
    localStorage.setItem(localStorageKey, String(true));
  }

  React.useEffect(() => {
    if (localStorage.getItem(localStorageKey)) {
      dispatch(openOrderFeedtModal());
    }
  }, [modalVisable])

  return (
    <section className={styles.section}>
      <div className={styles.orderList}>

        <div className={styles.order} onClick={handleClickCard} style={{ width: width }}>
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