import React, { ReactElement, FC } from 'react';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { Navigate, useLocation } from "react-router-dom";
import { getUserInfo } from '../../services/reducers/authSlice';
import { RootState } from '../../services';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface IProtectedRouteElement {
  element: ReactElement,
  anonymous?: boolean
}

const ProtectedRouteElement: FC<IProtectedRouteElement> = ({ element, anonymous = false }) => {

  const isLoggedIn = useSelector((store: RootState) => store.auth.isLoggedIn);
  const location = useLocation();
  const from: string = location.state?.from || '/';
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();


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