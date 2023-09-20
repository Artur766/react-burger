import React from 'react';
import styles from "./ForgotPassword.module.css"
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom"
import { useFormValidation } from '../../hooks/useFormValidation';
import { forgotPassword } from '../../utils/api';
import { Loader } from '../../components/loader/loader';

function ForgotPassword() {

  const { values, errors, isValid, handleChange } = useFormValidation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    forgotPassword(values["email"])
      .then(res => {
      })
      .catch(err => setIsError(err.message))
      .finally(() => setIsLoading(false));
  }

  return (
    <main className={styles.main}>
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <Input
          type={'email'}
          placeholder={'Укажите E-mail'}
          onChange={handleChange}
          value={values["email"] || ""}
          name={'email'}
          error={errors["email"] ? true : false}
          errorText={errors["email"]}
          size={'default'}
          extraClass="ml-1"
          required
        />
        {isLoading ?
          <Loader size="medium" />
          :
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={!isValid}
            extraClass={styles.btn}
          >
            Восстановить
          </Button>
        }
        {isError && <span className='error'>{isError}</span>}
        <p className={styles.text}>Вспомнили пароль?
          <Link to="/login" className={styles.link}> Войти</Link>
        </p>
      </form>
    </main>
  )
}

export default ForgotPassword;
