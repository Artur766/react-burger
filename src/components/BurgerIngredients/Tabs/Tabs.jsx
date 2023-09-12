import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./Тabs.module.css";
import PropTypes from 'prop-types';

function Tabs({ currentTab, onClickTab }) {


  return (
    <div className={styles.tabs}>
      <Tab value="buns" active={currentTab === 'buns'} >
        Булки
      </Tab>
      <Tab value="sauces" active={currentTab === "sauce"} >
        Соусы
      </Tab>
      <Tab value="main" active={currentTab === 'main'} >
        Начинки
      </Tab>
    </div>
  )
}

export default Tabs;

Tabs.propTypes = {
  currentTab: PropTypes.string.isRequired,
}