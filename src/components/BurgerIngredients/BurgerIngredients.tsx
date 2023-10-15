import React, { Fragment } from 'react';
import styles from "./BurgerIngredients.module.css";
import Tabs from './Tabs/Tabs';
import { arrTitleIngredients } from '../../utils/constants';
import Ingredient from './Ingredient/Ingredient';
import { useSelector } from 'react-redux';
import { Loader } from '../loader/loader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { RootState } from '../../services';
import { IIngredient, TCurrentTab } from '../../utils/types';

const BurgerIngredients = () => {

  const { ingredients, ingredientsRequest, error } = useSelector((store: RootState) => store.ingredients);
  const h2Refs = React.useRef<HTMLHeadingElement[]>([]);
  const [active, setActive] = React.useState<TCurrentTab>("buns");

  const setH2Ref = (index: number) => (element: HTMLHeadingElement) => {
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
      <h1 className={styles.title}>Соберите бургер</h1>
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
                          ingredients.map((item: IIngredient) => {
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

export default BurgerIngredients;
