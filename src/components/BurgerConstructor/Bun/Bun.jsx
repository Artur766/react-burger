import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./Bun.module.css"

function Bun({ name, price, image, type, positionName }) {
  return (
    <div className={styles.containerConstructorElement} >
      <ConstructorElement
        type={type}
        isLocked={true}
        text={`${name} (${positionName})`}
        price={price}
        thumbnail={image}
      />
    </div>
  )
}

export default Bun;