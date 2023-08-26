import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import styles from "./App.module.css"
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getAllIngredients } from '../../utils/Api';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Modal from '../Modal/Modal';

function App() {

  const [ingredients, setIngredients] = React.useState([]);
  const [orderModalVisable, setOrderModalVisable] = React.useState(false);
  const [ingredientModalVisable, setIngredientModalVisable] = React.useState(false);
  const [ingredient, setIngredient] = React.useState({});
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    getAllIngredients()
      .then(dataIngredients => {
        setIngredients(dataIngredients.data);
      })
      .catch(err => {
        setError(err);
      });
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
    (error
      ?
      <ErrorBoundary error={error} />
      :
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients title="Соберите бургер" ingredients={ingredients} onCardClick={handleOpenModalIngredient} />
          <BurgerConstructor ingredients={ingredients} onClick={handleOpenModalOrder} />
        </main>
        <Modal onClose={handleCloseAllModal} isOpen={orderModalVisable}>
          <OrderDetails />
        </Modal>
        <Modal onClose={handleCloseAllModal} isOpen={ingredientModalVisable}>
          <IngredientDetails ingradient={ingredient} />
        </Modal>
      </div>)
  );
}

export default App;
