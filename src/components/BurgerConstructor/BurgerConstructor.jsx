import React from 'react';
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Bun from './Bun/Bun';
import Order from './Order/Order';
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from 'react-dnd/dist/hooks';
import { addIngredient, deleteIngredient } from '../../services/reducers/ingredientsConstructorSlice';
import { decrementCount, incrementCount } from '../../services/reducers/ingredientsSlice';
import { v4 as uuidv4 } from 'uuid';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.ingredientsConstructor);

  const [{ isOver }, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addIngredient({ ...item, id: uuidv4() }));
      dispatch(incrementCount((item._id)));
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  });

  const borderColor = isOver ? "#4c4cff" : "transparent";

  function handleClose(_id, newId) {
    dispatch(deleteIngredient(newId));
    dispatch(decrementCount(_id));
  }

  return (
    <section>
      <div className={styles.constructorList} >
        <Bun
          isLocked={ingredients.length && true}
          type="top"
          positionName="верх"
        />
        <div className={styles.scrollBarContainer} ref={dropRef} style={ingredients.length ? { borderColor } : {}}>
          {
            ingredients.length
              ?
              ingredients.map((item) => {
                return (item.type !== "bun" &&
                  <div key={item.id} className={styles.containerConstructorElement} >
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image_large}
                      handleClose={() => handleClose(item._id, item.id)}
                    />
                  </div>)
              })
              :
              <div className={styles.emptyElement} style={{ borderColor }}>Перенесите сюда ингредиенты</div>
          }
        </div> <Bun
          isLocked={ingredients.length && true}
          type="bottom"
          positionName="низ"
        />
      </div>
      <Order />
    </section>
  )
}

export default BurgerConstructor;
