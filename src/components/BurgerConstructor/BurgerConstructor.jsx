import React from 'react';
import styles from "./BurgerConstructor.module.css";
import Bun from './Bun/Bun';
import Order from './Order/Order';
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from 'react-dnd/dist/hooks';
import { addIngredient, resetConstructor } from '../../services/reducers/ingredientsConstructorSlice';
import { incrementCount, resetCount } from '../../services/reducers/ingredientsSlice';
import { v4 as uuidv4 } from 'uuid';
import ConstructorIngredient from './ConstructorIngredient/ConstructorIngredient';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.ingredientsConstructor);
  const { modalOrdervisable } = useSelector(store => store.order);

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

  React.useEffect(() => {
    if (modalOrdervisable) {
      dispatch(resetConstructor());
      dispatch(resetCount());
    }
  }, [modalOrdervisable])

  return (
    <section>
      <div className={styles.constructorList} >
        <Bun
          isLocked={ingredients.length < 0 && true}
          type="top"
          positionName="верх"
        />
        <div className={styles.scrollBarContainer} ref={dropRef} style={ingredients.length ? { borderColor } : {}}>
          {
            ingredients.length
              ?
              ingredients.map(item => {
                return (item.type !== "bun" &&
                  <ConstructorIngredient
                    key={item.id}
                    ingredient={item}
                  />
                )
              })
              :
              <div className={styles.emptyElement} style={{ borderColor }}>Перенесите сюда ингредиенты</div>
          }
        </div>
        <Bun
          isLocked={ingredients.length < 0 && true}
          type="bottom"
          positionName="низ"
        />
      </div>
      <Order />
    </section>
  )
}


export default BurgerConstructor;
