import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import styles from "./App.module.css"
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getAllIngredients } from '../../utils/Api';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function App() {

  const [ingredients, setIngredients] = React.useState([]);
  const [orderModalVisable, setOrderModalVisable] = React.useState(false);
  const [ingredientModalVisable, setIngredientModalVisable] = React.useState(false);
  const [ingredient, setIngredient] = React.useState({})

  React.useEffect(() => {
    getAllIngredients()
      .then(dataIngredients => {
        console.log(dataIngredients);
        setIngredients(dataIngredients.data);
      })
      .catch(err => console.log(err));
  }, [])

  function handleOpenModalOrder() {
    setOrderModalVisable(true);
  }

  function handleOpenModalIngredient(dataIngredient) {
    setIngredient(dataIngredient)
    setIngredientModalVisable(true);
  }

  function handleCloseAllModal() {
    setIngredientModalVisable(false);
    setOrderModalVisable(false);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients title="Соберите бургер" ingredients={ingredients} onCardClick={handleOpenModalIngredient} />
        <BurgerConstructor ingredients={ingredients} onClick={handleOpenModalOrder} />
      </main>
      <IngredientDetails onClose={handleCloseAllModal} isOpen={ingredientModalVisable} ingradient={ingredient} />
      <OrderDetails onClose={handleCloseAllModal} isOpen={orderModalVisable} />
    </div>
  );
}

export default App;
