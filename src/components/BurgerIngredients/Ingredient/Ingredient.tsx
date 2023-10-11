import React, { FC } from 'react';
import styles from "./Ingredient.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';
import { openIngredientModal } from '../../../services/reducers/currentIngredientSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { IIngredient } from '../../../types';

interface IIngredientProps {
  ingradient: IIngredient
}

const Ingredient: FC<IIngredientProps> = ({ ingradient }) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: ingradient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const [{ opacity: bunOpacity }, dragRefBun] = useDrag({
    type: "bun",
    item: ingradient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })
  const dragRefToUse = ingradient.type !== "bun" ? dragRef : dragRefBun;
  const opacityToUse = ingradient.type !== "bun" ? opacity : bunOpacity;

  function handleClickCard() {
    dispatch(openIngredientModal(ingradient));
    navigate(`/ingredient/${ingradient._id}`, { state: { background: location } });
    localStorage.setItem("ingredientModalOpen", String(true));
  }

  return (
    < div
      ref={dragRefToUse}
      className={styles.card}
      onClick={handleClickCard}
      style={{ opacity: opacityToUse }}
    >
      {ingradient.count !== 0 && <Counter count={ingradient.count} size="default" extraClass={`${styles.counter}"m-1"`} />}
      <img className={styles.image} src={ingradient.image} alt="ингредиент" />
      <div className={styles.containerIngredients}>
        <p className={styles.price}>{ingradient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.name}>{ingradient.name}</p>
    </ div>)
}

export default Ingredient;