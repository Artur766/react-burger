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
import { Route, Routes } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import Orders from '../Orders/Orders';
import UserForm from '../UserForm/UserForm';
import { ProtectedRouteElement } from '../ProtectedRouteElement/ProtectedRouteElement';

function App() {
  const { currentIngredient, modalIngredientVisable } = useSelector(store => store.currentIngredient);
  const { modalOrdervisable } = useSelector(store => store.order);
  const dispatch = useDispatch();

  function handleCloseAllModal() {
    dispatch(closeIngredientModal());
    dispatch(closeModalOrder());
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<ProtectedRouteElement element={<Profile />} />} >
          <Route path="" element={<UserForm />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path='/*' element={<NotFound />} />
      </Routes>
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
