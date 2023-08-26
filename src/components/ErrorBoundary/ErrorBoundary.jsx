import React from 'react';
import PropTypes from 'prop-types';
import styles from "./ErrorBoundary.module.css"

function ErrorBoundary({ error }) {

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

ErrorBoundary.propTypes = {
  error: PropTypes.string
}
