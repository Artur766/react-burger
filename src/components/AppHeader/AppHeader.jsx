import React from 'react';
import styles from "./AppHeader.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon, MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import logo from "../../images/logo.svg"
import BurgerMenu from './BurgerMenu/BurgerMenu';
import { NavLink, useLocation } from 'react-router-dom';

function AppHeader() {

  const [visable, setVisableMenu] = React.useState(false);
  const location = useLocation(); // получаем текущий путь

  function handleVisableMenu() {
    setVisableMenu(!visable);
  }

  function handleIsActiveLink(isActive) {
    return isActive ? `${styles.navigationItem} ${styles.activeNavigation}` : styles.navigationItem;
  }

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.contentMobile}>
          <img src={logo} alt="лого" />
           <MenuIcon onClick={handleVisableMenu} />
        </div>
        {visable && <BurgerMenu closeMenu={handleVisableMenu} />}
        <div className={styles.container}>
          <nav className={styles.navigation}>
            <NavLink to="/" className={({ isActive }) => handleIsActiveLink(isActive)} >
              <BurgerIcon type={location.pathname === "/" ? "primiry" : "secondary"} />Конструктор
            </NavLink>
            <NavLink to="/ribbon-order" className={({ isActive }) => handleIsActiveLink(isActive)}>
              <ListIcon type={location.pathname === "/ribbon-order" ? "primiry" : "secondary"} />
              Лента заказов
            </NavLink>
          </nav>
          <Logo />
        </div>
        <NavLink to="/profile" className={({ isActive }) => handleIsActiveLink(isActive)}>
          <ProfileIcon type={location.pathname === "/profile" || location.pathname === "/profile/orders" ? "primiry" : "secondary"} />Личный кабинет
        </NavLink>
      </div>
    </header >
  )
}

export default AppHeader;