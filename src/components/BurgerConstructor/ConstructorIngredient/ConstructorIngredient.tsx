import React, { FC } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./ConstructorIngredient.module.css";
import { swapIngredient, deleteIngredient } from '../../../services/reducers/ingredientsConstructorSlice';
import { decrementCount } from '../../../services/reducers/ingredientsSlice'
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { IIngredient, TDropCollectedProps } from '../../../utils/types';

interface IConstructorIngredient {
  ingredient: IIngredient
}

const ConstructorIngredient: FC<IConstructorIngredient> = ({ ingredient }) => {

  const [{ opacity }, dragRef] = useDrag({
    type: "constructorIngredient",
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const [{ isOver }, dropRef] = useDrop<IIngredient, unknown, TDropCollectedProps>({
    accept: "constructorIngredient",
    drop(currentIngredient) {
      if (currentIngredient._id === ingredient._id) return
      dispatch(swapIngredient({ currentIngredient, ingredient }));
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  });

  const dispatch = useDispatch();

  function handleClose<T extends string>(_id: T, newId: T | undefined): void {
    dispatch(deleteIngredient(newId));
    dispatch(decrementCount(_id));
  }

  return (
    <div ref={dropRef} style={{ opacity }}>
      <div key={ingredient.id} className={styles.containerConstructorElement} ref={dragRef}>
        <DragIcon type="primary" />
        <ConstructorElement
          extraClass={isOver ? styles.constructorElementBorder : ""}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_large}
          handleClose={() => handleClose(ingredient._id, ingredient.id)}
        />
      </div>
    </div >
  )
}

export default ConstructorIngredient;
