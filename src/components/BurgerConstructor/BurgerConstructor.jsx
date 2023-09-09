import React from 'react';
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Bun from './Bun/Bun';
import Order from './Order/Order';
import { useSelector } from "react-redux";

function BurgerConstructor() {

  const { ingredients } = useSelector(store => store.ingredientsConstructor)

  const [bun, setBun] = React.useState({})

  React.useEffect(() => {
    //Ищем в массиве булку
    const newBun = ingredients.find(elem => elem.type === "bun");
    setBun(newBun);
  }, [ingredients])

  return (
    <section>
      <div className={styles.constructorList} >
        <Bun
          type="top"
          positionName="верх"
          name={bun?.name}
          image={bun?.image}
          price={bun?.price}
        />
        <div className={styles.scrollBarContainer}>
          {
            ingredients.map((item) => {
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
        <Bun
          name={bun?.name}
          image={bun?.image}
          price={bun?.price}
          type="bottom"
          positionName="низ"
        />
      </div>
      <Order />
    </section>
  )
}

export default BurgerConstructor;
