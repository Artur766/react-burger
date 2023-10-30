import React, { FC } from 'react'
import styles from "./OrderFeed.module.css";
import { openOrderFeedtModal } from '../../services/reducers/orderFeed';
import ItemOrder from './ItemOrder';
import { useDispatch, useSelector } from '../../services/types/hooks';

export interface IOrderFeed {
  path: "/feed/" | "/profile/history-orders/",
  localStorageKey: "feedOrderModalOpen" | "feedOrderProfileModalOpen",
  width?: string
}

const OrderFeed: FC<IOrderFeed> = ({ path, localStorageKey, width }) => {

  const modalVisable = useSelector(store => store.feed.modalVisable);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (localStorage.getItem(localStorageKey)) {
      dispatch(openOrderFeedtModal());
    }
  }, [modalVisable])

  return (
    <section className={styles.section}>
      <div className={styles.orderList}>
        {
          [].map(item => {
            return (
              <ItemOrder
                localStorageKey={localStorageKey}
                path={path}
                width={width}
              />
            )
          })
        }
      </div>
    </section>
  )
}

export default OrderFeed;