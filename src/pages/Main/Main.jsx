import React from 'react';
import styles from "./Main.module.css";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import { openIngredientModal } from '../../services/reducers/currentIngredientSlice';
import { useDispatch } from "react-redux";

function Main() {

  const dispatch = useDispatch();

  function handleOpenModalIngredient(dataIngredient) {
    dispatch(openIngredientModal(dataIngredient))
  }

  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients title="Соберите бургер" onCardClick={handleOpenModalIngredient} />
        <BurgerConstructor />
      </DndProvider>
    </main>
  )
}

export default Main;
