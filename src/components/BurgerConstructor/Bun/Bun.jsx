import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./Bun.module.css";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from 'react-dnd/dist/hooks';
import { addBun, deleteBun } from '../../../services/reducers/ingredientsConstructorSlice';
import { decrementCount, incrementCount } from '../../../services/reducers/ingredientsSlice';

function Bun({ type, positionName, isLocked }) {

  const dispatch = useDispatch();
  const { bun } = useSelector(store => store.ingredientsConstructor);

  const [{ isOver }, dropRefBun] = useDrop({
    accept: "bun",
    drop(item) {
      dispatch(addBun(item));
      if (bun.name !== item.name) {
        dispatch(incrementCount((item._id)));
        if (bun.type) {
          dispatch(decrementCount((bun._id)));
        }
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  });
  const borderColor = isOver ? "#4c4cff" : "transparent";

  function handleClose() {
    dispatch(deleteBun());
    dispatch(decrementCount(bun._id));
  }

  return (
    <div className={styles.containerConstructorElement} >
      {bun.name ?
        <div ref={dropRefBun}  >
          <ConstructorElement
            extraClass={isOver && styles.wrapperConstructorElement}
            handleClose={handleClose}
            type={type}
            isLocked={isLocked}
            text={`${bun.name} (${positionName})`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        :
        <div
          ref={dropRefBun}
          style={{ borderColor }}
          className={`${styles.emptyElement} ${type === "top" ? styles.emptyElementPosTop : styles.emptyElementPosBottom} `}
        >
          Перенесите сюда булку
        </div>
      }
    </div>
  )
}

export default Bun;

Bun.propTypes = {
  type: PropTypes.string.isRequired,
  positionName: PropTypes.string.isRequired,
  isLocked: PropTypes.number.isRequired
}