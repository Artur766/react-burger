import React from 'react';
import styles from "./Ingredient.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientPropTypes } from '../../../utils/IngredientPropTypes';


function Ingreditent({ onCardClick, ingradient }) {

  function handleClickCard() {
    onCardClick(ingradient);
  }

  return (
    <div className={styles.card} onClick={handleClickCard}>
      <Counter className={styles.counter} count={1} size="default" extraClass="m-1" />
      <img className={styles.image} src={ingradient.image} alt="ингредиент" />
      <div className={styles.containerIngredients}>
        <p className={styles.price}>{ingradient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.name}>{ingradient.name}</p>
    </div>
  )
}

export default Ingreditent;

Ingreditent.propTypes = {
  ingradient: IngredientPropTypes.isRequired,
  onCardClick: PropTypes.func.isRequired
}