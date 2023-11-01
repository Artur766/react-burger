import React, { FC } from 'react';
import styles from "./Profile.module.css"
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/types/hooks';
import { logout } from '../../services/reducers/authSlice';
import { connect, disconnect } from '../../services/actions/wsActionTypes';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleIsActiveLink(isActive: boolean) {
    return isActive ? `${styles.link} ${styles.activeLink}` : styles.link;
  }

  function handleLogout() {
    dispatch(logout())
      .then(() => navigate("/login", { replace: true }));
  }

  React.useEffect(() => {
    dispatch(connect("wss://norma.nomoreparties.space/orders"));
    return () => {
      dispatch(disconnect());
    }
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <nav className={styles.navigation}>
        <NavLink className={({ isActive }) => handleIsActiveLink(isActive)} to="/profile" end>Профиль</NavLink>
        <NavLink className={({ isActive }) => handleIsActiveLink(isActive)} to="/profile/history-orders" end>История заказов</NavLink>
        <NavLink className={`${styles.link} ${styles.linkLogout}`} to="/" type='button' onClick={handleLogout}>Выход</NavLink>
        <p className={styles.text}>В этом разделе вы можете изменить свои персональные данные</p>
      </nav>
      <Outlet />
    </main>
  )
}

export default Profile;
