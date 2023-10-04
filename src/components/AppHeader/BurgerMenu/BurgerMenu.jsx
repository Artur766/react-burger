import React from 'react';
import styles from "./BurgerMenu.module.css";
import { CloseIcon, ProfileIcon, BurgerIcon, ListIcon, ArrowDownIcon, ArrowUpIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {  NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function BurgerMenu({ closeMenu }) {
  const [isProfile, setIsProfile] = React.useState(false);
  const location = useLocation(); // получаем текущий путь

  function handleMenuProfile() {
    setIsProfile(!isProfile)
  }
  const {isLoggedIn} = useSelector(store=> store.auth);

  function handleIsActiveLink(isActive) {
    return isActive ? `${styles.navigationItem} ${styles.activeNavigation}` : styles.navigationItem;
  }

  return (
    <div className={styles.burger}>
      <div className={styles.list}>
        <div className={styles.header}>
          <h2 className={styles.title}>Меню</h2>
          <CloseIcon type="primary" onClick={closeMenu} />
        </div>
        <nav className={styles.navigation}>
          <div className={styles.profileContainer} >
            <NavLink 
              to="/profile" 
              className={({ isActive }) => handleIsActiveLink(isActive)}
              onClick={closeMenu}
            > <ProfileIcon type={location.pathname === "/profile" ? "primiry" : "secondary"} />
            Личный кабинет
            </NavLink>
           {isLoggedIn && (isProfile ? <ArrowUpIcon type="primary" onClick={handleMenuProfile} /> : <ArrowDownIcon onClick={handleMenuProfile} type="primary" />)}
          </div>
          {isProfile &&
            <>
              <NavLink to="/profile" className={({ isActive }) => handleIsActiveLink(isActive)} onClick={closeMenu}>Профиль</NavLink>
              <NavLink to="/h" className={({ isActive }) => handleIsActiveLink(isActive)} onClick={closeMenu}>История заказов</NavLink>
              <NavLink to="/" className={({ isActive }) => handleIsActiveLink(isActive)} onClick={closeMenu}>Выход</NavLink>
            </>
          }
          <NavLink className={({ isActive }) => handleIsActiveLink(isActive)} to="/" onClick={closeMenu}>
            <BurgerIcon type={location.pathname === "/" ? "primiry" : "secondary"} />Конструктор бургеров
          </NavLink>
          <NavLink 
            to="/orders" 
            className={({ isActive }) => handleIsActiveLink(isActive)} 
            onClick={closeMenu}> <ListIcon type={location.pathname === "/orders" ? "primiry" : "secondary"} />
            Лента заказов
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default BurgerMenu;

BurgerMenu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
}
