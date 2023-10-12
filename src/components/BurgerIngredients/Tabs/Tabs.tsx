import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./Тabs.module.css";
import { TCurrentTab } from '../../../utils/types';

interface ICurrentTab {
  currentTab: TCurrentTab
}

const Tabs: FC<ICurrentTab> = ({ currentTab }) => {
  return (
    <div className={styles.tabs}>
      <Tab onClick={() => undefined} value="buns" active={currentTab === 'buns'} >
        Булки
      </Tab>
      <Tab onClick={() => undefined} value="sauces" active={currentTab === "sauce"} >
        Соусы
      </Tab>
      <Tab onClick={() => undefined} value="main" active={currentTab === 'main'} >
        Начинки
      </Tab>
    </div>
  )
}

export default Tabs;