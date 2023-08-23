import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import styles from "./App.module.css"
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients title="Соберите бургер" />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
