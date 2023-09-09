import React, { Fragment } from 'react';
import styles from "./BurgerIngredients.module.css";
import Tabs from './Tabs/Tabs';
import { arrTitleIngredients } from '../../utils/constants';
import PropTypes from 'prop-types';
import Ingredient from './Ingredient/Ingredient';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/reducers/ingredientsSlice';
import { Loader } from '../loader/loader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

function BurgerIngredients({ title, onCardClick }) {

  const { ingredients, ingredientsRequest, error } = useSelector(store => store.ingredients);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <section className={styles.ingredients}>
      <h1 className={styles.title}>{title}</h1>
      <Tabs />
      {
        ingredientsRequest
          ?
          <Loader size="large" />
          :
          error
            ?
            <ErrorBoundary error={error} />
            :
            < div className={styles.container}>
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
            </ div>
      }
    </section >
  )
}

BurgerIngredients.propTypes = {
  title: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default BurgerIngredients;
