import React from 'react';
import styles from "./Ingredient.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientPropTypes } from '../../../utils/IngredientPropTypes';
import { useDrag } from "react-dnd";

function Ingredient({ onCardClick, ingradient }) {

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: ingradient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  function handleClickCard() {
    onCardClick(ingradient);
  }

  return (
    < div ref={dragRef} className={styles.card} onClick={handleClickCard} style={{ opacity }}>
      <Counter className={styles.counter} count={1} size="default" extraClass="m-1" />
      <img className={styles.image} src={ingradient.image} alt="ингредиент" />
      <div className={styles.containerIngredients}>
        <p className={styles.price}>{ingradient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.name}>{ingradient.name}</p>
    </ div>)
}

export default Ingredient;

Ingredient.propTypes = {
  ingradient: IngredientPropTypes.isRequired,
  onCardClick: PropTypes.func.isRequired
}