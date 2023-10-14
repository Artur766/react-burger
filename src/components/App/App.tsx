import React, { FC } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import styles from "./App.module.css";
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
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import Orders from '../Orders/Orders';
import UserForm from '../UserForm/UserForm';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import { getIngredients } from '../../services/reducers/ingredientsSlice';
import { RootState } from '../../services';
import { refreshToken } from '../../utils/auth';

const App: FC = () => {
  const modalIngredientVisable = useSelector((store: RootState) => store.currentIngredient.modalIngredientVisable);
  const modalOrdervisable = useSelector((store: RootState) => store.order.modalOrdervisable);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  function handleCloseAllModal() {
    navigate("/")
    dispatch(closeIngredientModal());
    dispatch(closeModalOrder());
    localStorage.removeItem("ingredientModalOpen");
  }

  React.useEffect(() => {
    //@ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/register' element={<ProtectedRouteElement element={<Register />} anonymous={true} />} />
        <Route path='/login' element={<ProtectedRouteElement element={<Login />} anonymous={true} />} />
        <Route path='/forgot-password' element={<ProtectedRouteElement element={<ForgotPassword />} anonymous={true} />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<ProtectedRouteElement element={<Profile />} />} >
          <Route path="" element={<UserForm />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path='/ingredient/:id' element={
          background
            ?
            <>
              < Main />
              <Modal onClose={handleCloseAllModal} isOpen={modalIngredientVisable} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            </>
            :
            <IngredientDetails />
        } />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      <Modal onClose={handleCloseAllModal} isOpen={modalOrdervisable}>
        <OrderDetails />
      </Modal>
    </div>
  );
}

export default App;
