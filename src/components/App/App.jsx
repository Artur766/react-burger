import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import styles from "./App.module.css"
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getAllIngredients } from '../../utils/Api';

function App() {

  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    getAllIngredients()
      .then(dataIngredients => {
        console.log(dataIngredients);
        setIngredients(dataIngredients.data);
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients title="Соберите бургер" ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  );
}

export default App;
