import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUserInfo } from '../../services/reducers/authSlice';
import PropTypes from 'prop-types';

export const ProtectedRouteElement = ({ element }) => {
  const { user } = useSelector(store => store.auth);
  const [isUserLoaded, setUserLoaded] = React.useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(() => {
    async function init() {
      await dispatch(getUserInfo());
      setUserLoaded(true);
    };
    init();
  }, []);


  if (!isUserLoaded) {
    return null;
  }

  if (!user.name) {// Сохраняем запрашиваемый маршрут в localStorage
    localStorage.setItem('redirectPath', location.pathname);
    return <Navigate to="/login" replace />;
  }

  return element;
}

ProtectedRouteElement.propTypes = {
  isOpen: PropTypes.elementType,
}