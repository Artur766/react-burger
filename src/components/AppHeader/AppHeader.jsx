import React from 'react';
import headerStyles from "./AppHeader.module.css"
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.content}>
        <div className={headerStyles.container}>
          <nav className={headerStyles.navigation}>
            <a
              href="#" className={`${headerStyles.navigationItem} ${headerStyles.navigationItemActive}`}> <BurgerIcon type="primary" />Конструктор</a>
            <a href="#" className={headerStyles.navigationItem}> <ListIcon type="secondary" />Лента заказов</a>
          </nav>
          <Logo />
        </div>
        <a href="#" className={headerStyles.profile}> <ProfileIcon type="secondary" />Личный кабинет</a>
      </div>
    </header>
  )
}

export default AppHeader;