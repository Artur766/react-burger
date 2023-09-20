import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import styles from "./App.module.css"
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { useSelector, useDispatch } from "react-redux";
import { closeIngredientModal } from '../../services/reducers/currentIngredientSlice';
import { closeModalOrder } from '../../services/reducers/orderSlice';
import Main from '../../pages/Main/Main';
import Register from '../../pages/Register/Register';
import Login from '../../pages/Login/Login';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';

function App() {
  const { currentIngredient, modalIngredientVisable } = useSelector(store => store.currentIngredient);
  const { modalOrdervisable } = useSelector(store => store.order)
  const dispatch = useDispatch();

  function handleCloseAllModal() {
    dispatch(closeIngredientModal());
    dispatch(closeModalOrder());
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      {/* <Main /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <ForgotPassword /> */}
      {/* <ResetPassword /> */}
      <Profile />
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
