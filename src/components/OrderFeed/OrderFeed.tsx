import React, { FC } from 'react'
import styles from "./OrderFeed.module.css";
import ItemOrder from './ItemOrder/ItemOrder';
import { IMessage } from '../../utils/types';

export interface IOrderFeed {
  path: "/feed/" | "/profile/history-orders/",
  localStorageKey: "feedOrderModalOpen" | "feedOrderProfileModalOpen",
  width?: string,
  messageWebSocket?: IMessage,
  isReadiness?: boolean
}

const OrderFeed: FC<IOrderFeed> = ({ path, localStorageKey, width, messageWebSocket, isReadiness }) => {

  return (
    <section className={styles.section}>
      <div className={styles.orderList}>
        {
          messageWebSocket?.orders.map(item => {
            return (
              <ItemOrder
                isReadiness={isReadiness}
                item={item}
                key={item._id}
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