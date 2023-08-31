import React from 'react';
import styles from "./AppHeader.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon, MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import logo from "../../images/logo.svg"
import BurgerMenu from './BurgerMenu/BurgerMenu';
function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.contentMobile}>
          <a href=""><img src={logo} alt="" /></a>
          <MenuIcon />
        </div>
        <BurgerMenu />
        <div className={styles.container}>
          <nav className={styles.navigation}>
            <a href="#" className={`${styles.navigationItem} ${styles.activeNavigation}`}>
              <BurgerIcon type="primary" />Конструктор
            </a>
            <a href="#" className={styles.navigationItem}> <ListIcon type="secondary" />Лента заказов</a>
          </nav>
          <a href="#" className={styles.navigationItem}> <Logo /></a>
        </div>
        <a href="#" className={styles.profile}> <ProfileIcon type="secondary" />Личный кабинет</a>
      </div>
    </header >
  )
}

export default AppHeader;