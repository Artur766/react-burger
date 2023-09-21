import React from 'react';
import styles from "./Profile.module.css"
import { NavLink } from 'react-router-dom';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

function Profile() {

  function handleIsActiveLink(isActive) {
    return isActive ? `${styles.link} ${styles.activeLink}` : styles.link;
  }

  return (
    <main className={styles.main}>
      <nav className={styles.navigation}>
        <NavLink className={({ isActive }) => handleIsActiveLink(isActive)} to="/profile" end>Профиль</NavLink>
        <NavLink className={({ isActive }) => handleIsActiveLink(isActive)} to="/profile/orders" exact>История заказов</NavLink>
        <NavLink className={styles.link} to="/" >Выход</NavLink>
        <p className={styles.text}>В этом разделе вы можете изменить свои персональные данные</p>
      </nav>
      <form >
        <PasswordInput
          placeholder='Имя'
          // onChange={onChange}
          // value={value}
          name={'password'}
          icon="EditIcon"
          extraClass={styles.input}
        />
        <PasswordInput
          placeholder='Логин'
          // onChange={onChange}
          // value={value}
          name={'password'}
          icon="EditIcon"
          extraClass={styles.input}
          pattern='[a-z0-9]+@[a-z]+\.{1,1}[a-z]{2,}'
        />
        <PasswordInput
          // onChange={onChange}
          // value={value}
          name={'password'}
          icon="EditIcon"
        />
      </form>
    </main>
  )
}

export default Profile;
