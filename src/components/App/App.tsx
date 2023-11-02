import React, { FC } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import styles from "./App.module.css";
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { useSelector, useDispatch } from "../../services/types/hooks";
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
import UserForm from '../UserForm/UserForm';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import { getIngredients } from '../../services/reducers/ingredientsSlice';
import Feed from '../../pages/Feed/Feed';
import OrderInfo from '../OrderInfo/OrderInfo';
import { closeOrderFeedModal } from '../../services/reducers/orderFeed';
import OrderFeed from '../OrderFeed/OrderFeed';

const App: FC = () => {
  const modalIngredientVisable = useSelector(store => store.currentIngredient.modalIngredientVisable);
  const modalOrdervisable = useSelector(store => store.order.modalOrdervisable);
  const modalOrderFeedVisable = useSelector(store => store.feed.modalVisable);
  const messageWebSocket = useSelector(store => store.orderFeed.messages)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  function handleCloseAllModal() {
    navigate(-1);
    dispatch(closeIngredientModal());
    dispatch(closeModalOrder());
    dispatch(closeOrderFeedModal());
    localStorage.removeItem("ingredientModalOpen");
    localStorage.removeItem("feedOrderModalOpen");
    localStorage.removeItem("feedOrderProfileModalOpen");
  }

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  console.log(messageWebSocket);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/register' element={<ProtectedRouteElement element={<Register />} anonymous={true} />} />
        <Route path='/login' element={<ProtectedRouteElement element={<Login />} anonymous={true} />} />
        <Route path='/forgot-password' element={<ProtectedRouteElement element={<ForgotPassword />} anonymous={true} />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<ProtectedRouteElement element={<Profile />} />} >
          <Route path="" element={<UserForm />} />
          <Route path="history-orders" element={<OrderFeed path="/profile/history-orders/" localStorageKey='feedOrderProfileModalOpen' width='796px' messageWebSocket={messageWebSocket} isReadiness={true} />} />
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
        <Route path='/feed/:id' element={
          background
            ?
            <>
              <Feed />
              <Modal onClose={handleCloseAllModal} isOpen={modalOrderFeedVisable}  >
                <OrderInfo />
              </Modal>
            </>
            :
            <OrderInfo />
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
