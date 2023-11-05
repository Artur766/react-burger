import React, { FC } from 'react'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./ItemOrder.module.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../services/types/hooks';
import { openOrderFeedtModal } from '../../../services/reducers/orderFeedSlice';
import { IOrderFeed } from '../OrderFeed';

interface IItemOrder extends IOrderFeed {
  item: {
    ingredients: string[];
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: Date;
    updatedAt: Date;
    price: number;
    __v: number;
  },
  isReadiness?: boolean
}

const ItemOrder: FC<IItemOrder> = ({ path, width, localStorageKey, item, isReadiness }) => {

  const navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();
  const createdAt = new Date(item.createdAt);
  const ingredients = useSelector(store => store.ingredients.ingredients);
  const lastImageSrc = ingredients.find(ingredient => ingredient._id === item.ingredients[5])?.image;

  const sum = ingredients.reduce((acc, ingredient) => {
    if (item.ingredients.includes(ingredient._id)) {
      return acc + ingredient.price;
    }
    return acc;
  }, 0);

  function handleClickCard() {
    dispatch(openOrderFeedtModal({ item, sum }));
    localStorage.setItem("number", String(item.number));
    navigate(`${path}/${item._id}`, { state: { background: location } });
    localStorage.setItem(localStorageKey, String(true));
  }

  return (
    <div className={styles.order} onClick={handleClickCard} style={{ width: width }}>
      <div className={styles.containerDate}>
        <p className={styles.numberOrder}>#{item.number}</p>
        <FormattedDate className={styles.date} date={createdAt} />
      </div>
      <div>
        <p className={styles.description}>{item.name}</p>
        {
          isReadiness && (
            item.status === 'created' ? <p className={styles.isReadiness}>Создан</p> :
              item.status === 'pending' ? <p className={styles.isReadiness}>Готовится</p> :
                <p className={styles.isReadinessDone}>Выполнен</p>
          )
        }
      </div>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          {
            item.ingredients.slice(0, 5).map((ingredient, i) => {
              const image = ingredients.find(item => item._id === ingredient)?.image;
              return <img key={i} className={styles.image} src={image} alt="" />
            })
          }
          {item.ingredients.length > 5 && (
            <>
              <div className={styles.sumImage}>
                +{item.ingredients.length - 5}
              </div>
              <img className={`${styles.image} ${styles.lastImage}`} src={lastImageSrc} alt="" />
            </>
          )}
        </div>
        <div className={styles.containerSum}>
          <p className={styles.sumOrder}>{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default ItemOrder