import React from 'react';
import styles from "./AppHeader.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.container}>
          <nav className={styles.navigation}>
            <a href="#" className={`${styles.navigationItem} ${styles.activeNavigation}`}>
              <BurgerIcon type="primary" />Конструктор
            </a>
            <a href="#" className={styles.navigationItem}> <ListIcon type="secondary" />Лента заказов</a>
          </nav>
          <Logo />
        </div>
        <a href="#" className={styles.profile}> <ProfileIcon type="secondary" />Личный кабинет</a>
      </div>
    </header >
  )
}

export default AppHeader;