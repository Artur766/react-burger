import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import styles from "./App.module.css"
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { useSelector, useDispatch } from "react-redux";
import { openIngredientModal, closeIngredientModal } from '../../services/reducers/currentIngredientSlice';
import { closeModalOrder } from '../../services/reducers/orderSlice';

function App() {
  const { currentIngredient, modalIngredientVisable } = useSelector(store => store.currentIngredient);
  const { modalOrdervisable } = useSelector(store => store.order)
  const dispatch = useDispatch();

  function handleOpenModalIngredient(dataIngredient) {
    dispatch(openIngredientModal(dataIngredient))
  }

  function handleCloseAllModal() {
    dispatch(closeIngredientModal());
    dispatch(closeModalOrder());
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients title="Соберите бургер" onCardClick={handleOpenModalIngredient} />
        <BurgerConstructor />
      </main>
      <Modal onClose={handleCloseAllModal} isOpen={modalOrdervisable}>
        <OrderDetails />
      </Modal>
      <Modal onClose={handleCloseAllModal} isOpen={modalIngredientVisable}>
        <IngredientDetails ingradient={currentIngredient} />
      </Modal>
    </div>
  );
}

export default App;
