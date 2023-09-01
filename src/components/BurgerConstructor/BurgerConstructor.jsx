import React from 'react';
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientsContext } from '../../context/IngredientsContext';
import Bun from './Bun/Bun';
import Order from './Order/Order';


function BurgerConstructor({ onClick }) {

  const { ingredients } = React.useContext(IngredientsContext);
  const [bun, setBun] = React.useState({})

  React.useEffect(() => {
    const newBun = ingredients.find(elem => elem.type === "bun");
    setBun(newBun)
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
      <Order onClick={onClick} />
    </section>
  )
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  onClick: PropTypes.func.isRequired
}