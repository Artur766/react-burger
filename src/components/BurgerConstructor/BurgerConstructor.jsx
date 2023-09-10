import React from 'react';
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Bun from './Bun/Bun';
import Order from './Order/Order';
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from 'react-dnd/dist/hooks';
import { addIngredient, deleteIngredient } from '../../services/reducers/ingredientsConstructorSlice';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.ingredientsConstructor);
  const [bun, setBun] = React.useState({});
  const [{ isOver }, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addIngredient(item));
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  });
  const borderColor = isOver ? "#4c4cff" : "transparent";
  const isLockedBun = ingredients.some(item => item.type === "main" || item.type === "sauce")

  React.useEffect(() => {
    //Ищем в массиве булку
    const newBun = ingredients.find(elem => elem.type === "bun");
    setBun(newBun);
  }, [ingredients]);

  return (
    <section>
      <div className={styles.constructorList} >
        {bun &&
          <Bun
            isLocked={isLockedBun}
            type="top"
            positionName="верх"
            name={bun?.name}
            image={bun?.image}
            price={bun?.price}
            id={bun?._id}
          />}
        <div className={styles.scrollBarContainer} ref={dropRef} style={{ borderColor }}>
          {
            ingredients.map((item) => {
              return (item.type !== "bun" &&
                <div key={item._id} className={styles.containerConstructorElement} >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image_large}
                    handleClose={() => dispatch(deleteIngredient(item._id))}
                  />
                </div>)
            })
          }
        </div>
        {bun && <Bun
          isLocked={isLockedBun}
          name={bun?.name}
          image={bun?.image}
          price={bun?.price}
          type="bottom"
          positionName="низ"
          id={bun?._id}
        />}
      </div>
      <Order />
    </section>
  )
}

export default BurgerConstructor;
