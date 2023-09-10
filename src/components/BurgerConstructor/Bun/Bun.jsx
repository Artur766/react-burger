import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./Bun.module.css";
import PropTypes from 'prop-types';
import { deleteIngredient } from '../../../services/reducers/ingredientsConstructorSlice';
import { useDispatch } from "react-redux";

function Bun({ name, price, image, type, positionName, isLocked, id }) {
  const dispatch = useDispatch();
  return (
    <div className={styles.containerConstructorElement} >
      <ConstructorElement
        handleClose={() => dispatch(deleteIngredient(id))}
        type={type}
        isLocked={isLocked}
        text={`${name} (${positionName})`}
        price={price}
        thumbnail={image}
      />
    </div>
  )
}

export default Bun;

Bun.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  type: PropTypes.string.isRequired,
  positionName: PropTypes.string.isRequired,
}