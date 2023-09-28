import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { getUserInfo } from '../../services/reducers/authSlice';

function ProtectedRouteElement({ element, anonymous = false }) {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);

  const location = useLocation();
  const from = location.state?.from || '/';
  const dispatch = useDispatch();


  React.useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    localStorage.setItem('redirectPath', location.pathname);
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return element;
}

export default ProtectedRouteElement;

ProtectedRouteElement.propTypes = {
  element: PropTypes.object.isRequired,
  anonymous: PropTypes.bool,
}