import React from 'react';
import styles from "./IngredientDetails.module.css";
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

function IngredientDetails({ onClose, isOpen, ingradient }) {
  return (
    <Modal title="Детали ингредиента" onClose={onClose} isOpen={isOpen}>
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
    </Modal>
  )
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  ingradient: PropTypes.object
}