import React, { FC } from 'react';
import styles from "./AppHeader.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon, MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import logo from "../../images/logo.svg"
import BurgerMenu from './BurgerMenu/BurgerMenu';
import { NavLink, useLocation } from 'react-router-dom';


const AppHeader: FC = () => {

  const [visable, setVisableMenu] = React.useState(false);
  const location = useLocation(); // получаем текущий путь

  function handleVisableMenu() {
    setVisableMenu(!visable);
  }

  function handleIsActiveLink(isActive: boolean): string {
    return isActive ? `${styles.navigationItem} ${styles.activeNavigation}` : styles.navigationItem;
  }

  function getTypeIcon<T extends string>(puth: T, puth2?: T): TIconTypes {
    return location.pathname === puth || location.pathname === puth2 ? "primiry" : "secondary";
  }

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.contentMobile}>
          <img src={logo} alt="лого" />
          <MenuIcon type="primary" onClick={handleVisableMenu} />
        </div>
        {visable && <BurgerMenu closeMenu={handleVisableMenu} />}
        <div className={styles.container}>
          <nav className={styles.navigation}>
            <NavLink to="/" className={({ isActive }) => handleIsActiveLink(isActive)} >
              <BurgerIcon type={getTypeIcon("/")} />Конструктор
            </NavLink>
            <NavLink to="/ribbon-order" className={({ isActive }) => handleIsActiveLink(isActive)}>
              <ListIcon type={getTypeIcon("/ribbon-order")} />
              Лента заказов
            </NavLink>
          </nav>
          <Logo />
        </div>
        <NavLink to="/profile" className={({ isActive }) => handleIsActiveLink(isActive)}>
          <ProfileIcon type={getTypeIcon("/profile", "/profile/orders")} />Личный кабинет
        </NavLink>
      </div>
    </header >
  )
}

export default AppHeader;