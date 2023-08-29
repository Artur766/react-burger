import React from 'react';
import styles from "./IngredientDetails.module.css";
import { IngredientPropTypes } from '../../utils/IngredientPropTypes';

function IngredientDetails({ ingradient }) {
  return (
    <>
      <img className={styles.image} src={ingradient.image_large} alt="" />
      <p className={styles.title}>{ingradient.name}</p>
      <div className={styles.containerSpecifications}>
        <div>
          <p className={styles.text}>Калории,ккал</p>
          <p className={styles.meaning}>{ingradient.calories}</p>
        </div>
        <div>
          <p className={styles.text}>Белки, г</p>
          <p className={styles.meaning}>{ingradient.proteins}</p>
        </div>
        <div>
          <p className={styles.text}>Жиры, г</p>
          <p className={styles.meaning}>{ingradient.fat}</p>
        </div>
        <div>
          <p className={styles.text}>Углеводы, г</p>
          <p className={styles.meaning}>{ingradient.carbohydrates}</p>
        </div>
      </div>
    </>
  )
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  ingradient: IngredientPropTypes.isRequired
}
