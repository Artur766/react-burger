import React, { useMemo } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import styles from "./App.module.css"
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getAllIngredients } from '../../utils/Api';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Modal from '../Modal/Modal';
import { IngredientsContext } from '../../context/IngredientsContext';

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const [orderModalVisable, setOrderModalVisable] = React.useState(false);
  const [ingredientModalVisable, setIngredientModalVisable] = React.useState(false);
  const [ingredient, setIngredient] = React.useState({});
  const [error, setError] = React.useState(null);
  const [orderNumber, setOrderNumber] = React.useState(0);
  const ingredientsContext = useMemo(() => {
    return { ingredients, setIngredients }
  }, [ingredients, setIngredients])

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
        <IngredientsContext.Provider value={ingredientsContext}>
          <main className={styles.main}>
            <BurgerIngredients title="Соберите бургер" onCardClick={handleOpenModalIngredient} />
            <BurgerConstructor setOrderNumber={setOrderNumber} onOpenModal={handleOpenModalOrder} />
          </main>
        </IngredientsContext.Provider>
        <Modal onClose={handleCloseAllModal} isOpen={orderModalVisable}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
        <Modal onClose={handleCloseAllModal} isOpen={ingredientModalVisable}>
          <IngredientDetails ingradient={ingredient} />
        </Modal>
      </div>
    )
  );
}

export default App;
