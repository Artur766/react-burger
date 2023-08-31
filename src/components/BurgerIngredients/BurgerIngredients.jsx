import React, { Fragment } from 'react';
import styles from "./BurgerIngredients.module.css";
import Tabs from './Tabs/Tabs';
import { arrTitleIngredients } from '../../utils/constants';
import PropTypes from 'prop-types';
import Ingredient from './Ingredient/Ingredient';
import { IngredientPropTypes } from '../../utils/IngredientPropTypes';

function BurgerIngredients({ title, ingredients, onCardClick }) {


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
                    ingredients.map(item => {
                      return (
                        item.type === typeIngred.type &&
                        <Ingredient
                          onCardClick={onCardClick}
                          key={item._id}
                          ingradient={item}
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
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(IngredientPropTypes).isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default BurgerIngredients;