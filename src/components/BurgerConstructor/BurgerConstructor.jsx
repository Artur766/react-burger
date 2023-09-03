import React from 'react';
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientsContext } from '../../context/IngredientsContext';
import Bun from './Bun/Bun';
import Order from './Order/Order';

const totalPriceInitialState = { totalPrice: 0 }

function reducer(state, action) {
  switch (action.type) {
    case "sum":
      return { totalPrice: action.payload }
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function BurgerConstructor({ onOpenModal, setOrderNumber }) {

  const { ingredients } = React.useContext(IngredientsContext);
  const [bun, setBun] = React.useState({})
  const [totalPrice, totalPriceDispatcher] = React.useReducer(reducer, totalPriceInitialState, undefined);

  React.useEffect(() => {
    //Ищем в массиве булку
    const newBun = ingredients.find(elem => elem.type === "bun");
    //Через редюс считаем сумму всех ингредиенитов 
    const sumIngredient = ingredients.reduce((acc, item) => {
      return item.type !== "bun" ? item.price + acc : acc;
    }, 0);
    setBun(newBun);
    totalPriceDispatcher({ type: "sum", payload: sumIngredient + (newBun?.price || 0) * 2 });
  }, [ingredients])

  return (
    <section>
      <div className={styles.constructorList} >
        <Bun
          type="top"
          positionName="верх"
          name={bun?.name}
          image={bun?.image}
          price={bun?.price}
        />
        <div className={styles.scrollBarContainer}>
          {
            ingredients.map((item) => {
              return (item.type !== "bun" &&
                <div key={item._id} className={styles.containerConstructorElement} >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image_large}
                  />
                </div>)
            })
          }
        </div>
        <Bun
          name={bun?.name}
          image={bun?.image}
          price={bun?.price}
          type="bottom"
          positionName="низ"
        />
      </div>
      <Order onOpenModal={onOpenModal} setOrderNumber={setOrderNumber} totalPrice={totalPrice} />
    </section>
  )
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  setOrderNumber: PropTypes.func.isRequired
}