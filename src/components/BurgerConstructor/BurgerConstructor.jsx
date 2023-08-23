import React from 'react';
import styles from "./BurgerConstructor.module.css"
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';

function BurgerConstructor() {
  const img = "https://code.s3.yandex.net/react/code/bun-02.png";
  return (
    <section>
      <div className={styles.constructorList} >
        <div className={styles.containerConstructorElement} >
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />
        </div>
        <div className={styles.scrollBarContainer}>
          {
            data.map((item) => {
              return (item.type !== "bun" &&
                <div key={item._id} className={styles.containerConstructorElement} >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image_large}
                  />
                </div>)
            })
          }
        </div>
        <div className={styles.containerConstructorElement} >
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={img}
          />
        </div>
      </div>
      <div className={styles.containerDecoration} >
        <div className={styles.containerTotalPrice}>
          <p className={styles.totalPrice}>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;