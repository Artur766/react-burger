import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./Тabs.module.css";

function Tabs({ currentTab, onClickTab }) {


  return (
    <div className={styles.tabs}>
      <Tab value="buns" active={currentTab === 'buns'} onClickTab={onClickTab}>
        Булки
      </Tab>
      <Tab value="sauces" active={currentTab === "sauce"} onClickTab={onClickTab}>
        Соусы
      </Tab>
      <Tab value="main" active={currentTab === 'main'} onClickTab={onClickTab}>
        Начинки
      </Tab>
    </div>
  )
}

export default Tabs;