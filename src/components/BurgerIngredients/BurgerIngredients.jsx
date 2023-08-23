import React, { Fragment } from 'react';
import styles from "./BurgerIngredients.module.css";
import Tabs from './Tabs/Tabs';
import { data } from '../../utils/data';
import { arrTitleIngredients } from '../../utils/utils';
import PropTypes from 'prop-types';
import Ingredient from './Ingredient/Ingredient';

function BurgerIngredients({ title }) {

  return (
    <section className={styles.ingredients}>
      <h1 className={styles.title}>{title}</h1>
      <Tabs />
      <div className={styles.container}>
        {
          arrTitleIngredients.map((typeIngred, i) => {
            return (
              <Fragment key={i}>
                <h2 className={styles.titleIngredients}>{typeIngred.title}</h2>
                <div className={styles.cardsList}>
                  {
                    data.map(item => {
                      return (
                        item.type === typeIngred.type &&
                        <Ingredient
                          key={item._id}
                          name={item.name}
                          price={item.price}
                          image={item.image}
                        />
                      )
                    })
                  }
                </div>
              </Fragment>
            )
          })
        }
      </div >
    </section >
  )
}

BurgerIngredients.propTypes = {
  title: PropTypes.string
};

export default BurgerIngredients;