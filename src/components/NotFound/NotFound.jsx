import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./NotFound.module.css";

function NotFound() {
  const history = useNavigate();

  function handleGoBack() {
    history(-1);
  }
  return (
    <main className={styles.notFound}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Страница не найдена</p>
      <button className={styles.button} onClick={handleGoBack}>Назад</button>
    </main>
  )
}

export default NotFound;