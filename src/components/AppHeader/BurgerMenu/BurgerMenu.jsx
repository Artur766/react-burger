import React from 'react';
import styles from "./BurgerMenu.module.css";
import { CloseIcon, ProfileIcon, BurgerIcon, ListIcon, ArrowDownIcon, ArrowUpIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
            <Link to="/profile" className={styles.navigationItem} onClick={closeMenu}> <ProfileIcon type="primary" />Личный кабинет</Link>
            {isProfile ? <ArrowUpIcon type="primary" /> : <ArrowDownIcon type="primary" />}
          </div>
          {isProfile &&
            <>
              <Link to="/profile" className={styles.linkProfile} onClick={closeMenu}>Профиль</Link>
              <Link to="/profile" className={styles.linkProfile} onClick={closeMenu}>История заказов</Link>
              <Link to="/profile" className={styles.linkProfile} onClick={closeMenu}>Выход</Link>
            </>
          }
          <Link href="#" className={`${styles.navigationItem}`} onClick={closeMenu}>
            <BurgerIcon type="secondary" />Конструктор бургеров
          </Link>
          <Link href="#" className={styles.navigationItem} onClick={closeMenu}> <ListIcon type="secondary" />Лента заказов</Link>
        </nav>
      </div>
    </div>
  )
}

export default BurgerMenu;

BurgerMenu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
}
