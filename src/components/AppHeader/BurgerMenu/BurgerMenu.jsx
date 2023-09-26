import React from 'react';
import styles from "./BurgerMenu.module.css";
import { CloseIcon, ProfileIcon, BurgerIcon, ListIcon, ArrowDownIcon, ArrowUpIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerMenu({ closeMenu }) {
  const [isProfile, setIsProfile] = React.useState(false);
  function handleMenuProfile() {
    setIsProfile(!isProfile)
  }
  return (
    <div className={styles.burger}>
      <div className={styles.list}>
        <div className={styles.header}>
          <h2 className={styles.title}>Меню</h2>
          <CloseIcon type="primary" onClick={closeMenu} />
        </div>
        <nav className={styles.navigation}>
          <div className={styles.profileContainer} onClick={handleMenuProfile}>
            <a href="#" className={styles.navigationItem}> <ProfileIcon type="primary" />Личный кабинет</a>
            {isProfile ? <ArrowUpIcon type="primary" /> : <ArrowDownIcon type="primary" />}
          </div>
          {isProfile &&
            <>
              <a href="#" className={styles.linkProfile} onClick={closeMenu}>Профиль</a>
              <a href="#" className={styles.linkProfile} onClick={closeMenu}>История заказов</a>
              <a href="#" className={styles.linkProfile} onClick={closeMenu}>Выход</a>
            </>
          }
          <a href="#" className={`${styles.navigationItem}`} onClick={closeMenu}>
            <BurgerIcon type="secondary" />Конструктор бургеров
          </a>
          <a href="#" className={styles.navigationItem} onClick={closeMenu}> <ListIcon type="secondary" />Лента заказов</a>
        </nav>
      </div>
    </div>
  )
}

export default BurgerMenu;

BurgerMenu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
}
