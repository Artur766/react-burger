import React from 'react';
import styles from "./IngredientDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { openIngredientModal, visableIngredientDetails } from '../../services/reducers/currentIngredientSlice';

function IngredientDetails() {

  const { currentIngredient, modalIngredientVisable } = useSelector(store => store.currentIngredient);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.ingredients);

  React.useEffect(() => {
    const ingredient = ingredients.find(item => item._id === id);
    if (!modalIngredientVisable && !localStorage.getItem("ingredientModalOpen")) {
      dispatch(visableIngredientDetails(ingredient));
    } else {
      dispatch(openIngredientModal(ingredient));
    }
  }, [ingredients, modalIngredientVisable])

  return (
    <div className={`${!modalIngredientVisable && styles.container}`}>
      {!modalIngredientVisable && <h1 className={styles.title}>Детали ингредиента</h1>}
      <img className={styles.image} src={currentIngredient?.image_large} alt="ингредиент" />
      <p className={styles.titleIngredient}>{currentIngredient?.name}</p>
      <div className={styles.containerSpecifications}>
        <div>
          <p className={styles.text}>Калории,ккал</p>
          <p className={styles.meaning}>{currentIngredient?.calories}</p>
        </div>
        <div>
          <p className={styles.text}>Белки, г</p>
          <p className={styles.meaning}>{currentIngredient?.proteins}</p>
        </div>
        <div>
          <p className={styles.text}>Жиры, г</p>
          <p className={styles.meaning}>{currentIngredient?.fat}</p>
        </div>
        <div>
          <p className={styles.text}>Углеводы, г</p>
          <p className={styles.meaning}>{currentIngredient?.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails;

