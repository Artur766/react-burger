import React, { Fragment } from 'react';
import styles from "./BurgerIngredients.module.css";
import Tabs from './Tabs/Tabs';
import { arrTitleIngredients } from '../../utils/constants';
import PropTypes from 'prop-types';
import Ingredient from './Ingredient/Ingredient';
import { useSelector } from 'react-redux';
import { Loader } from '../loader/loader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

function BurgerIngredients({ title }) {

  const { ingredients, ingredientsRequest, error } = useSelector(store => store.ingredients);
  const h2Refs = React.useRef([]);
  const [active, setActive] = React.useState("buns");

  const setH2Ref = (index) => (element) => {
    h2Refs.current[index] = element;
  };

  function handleScroll() {
    const rectBuns = h2Refs.current[0].getBoundingClientRect().top;
    const rectSauce = h2Refs.current[1].getBoundingClientRect().top;
    const rectMain = h2Refs.current[2].getBoundingClientRect().top;
    const scrollThreshold = window.innerHeight * 0.45; // Используем 45% от высоты окна просмотра
    if (rectBuns <= scrollThreshold && rectSauce > scrollThreshold) {
      setActive("buns");
    } else if (rectSauce <= scrollThreshold && rectMain > scrollThreshold) {
      setActive("sauce");
    } else if (rectMain <= scrollThreshold) {
      setActive("main");
    }
  }

  return (
    <section className={styles.ingredients}>
      <h1 className={styles.title}>{title}</h1>
      <Tabs currentTab={active} />
      {
        ingredientsRequest
          ?
          <Loader size="large" />
          :
          error
            ?
            <ErrorBoundary error={error} />
            :
            < div className={styles.container} onScroll={handleScroll}  >
              {
                arrTitleIngredients.map((typeIngred, i) => {
                  return (
                    <Fragment key={i}>
                      <h2 className={styles.titleIngredients} >{typeIngred.title}</h2>
                      <div className={styles.cardsList} ref={setH2Ref(i)}>
                        {
                          ingredients.map(item => {
                            return (
                              item.type === typeIngred.type &&
                              <Ingredient
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
};

export default BurgerIngredients;
