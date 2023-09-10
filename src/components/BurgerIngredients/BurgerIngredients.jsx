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
  }, [dispatch]);

  const h2Refs = React.useRef([]);
  const setH2Ref = (index) => (element) => {
    h2Refs.current[index] = element;
  };
  const [active, setActive] = React.useState("buns");


  function handleScroll() {
    const rectBuns = h2Refs.current[0].getBoundingClientRect().top;
    const rectSauce = h2Refs.current[1].getBoundingClientRect().top;
    const rectMain = h2Refs.current[2].getBoundingClientRect().top;
    console.log("Булки", rectBuns);
    console.log("Соусы", rectSauce);
    console.log("Начинки", rectMain);
    if (rectBuns < 0) {
      setActive("buns")
    } else if (rectSauce < 0) {
      setActive("sauce")
    } else if (rectMain < 0) {
      setActive("main")
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
                      <h2 className={styles.titleIngredients} ref={setH2Ref(i)}>{typeIngred.title}</h2>

                      <div className={styles.cardsList}>
                        {
                          ingredients.map(item => {
                            return (
                              item.type === typeIngred.type &&
                              <Ingredient
                                key={item._id}
                                onCardClick={onCardClick}
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
