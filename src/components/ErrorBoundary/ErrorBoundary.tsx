import React, { FC } from 'react';
import styles from "./ErrorBoundary.module.css";

interface IErrorBoundary {
  error: string
};

const ErrorBoundary: FC<IErrorBoundary> = ({ error }) => {

  return (
    <section>
      <h1 className={styles.title}>{"Что-то пошло не так :("}</h1>
      <p className={styles.error}>
        {error}
      </p>
    </section>
  );
}

export default ErrorBoundary;
