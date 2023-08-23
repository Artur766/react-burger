import React from 'react';
import styles from "./Ingredient.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


function Ingreditent({ image, price, name }) {
  return (
    <div className={styles.card} >
      <Counter styles={{ position: "absolute" }} count={1} size="default" extraClass="m-1" />
      <img className={styles.image} src={image} alt="ингредиент" />
      <div className={styles.containerIngredients}>
        <p className={styles.price}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.name}>{name}</p>
    </div>
  )
}

Ingreditent.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
}

export default Ingreditent;
