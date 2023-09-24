import React from 'react';
import styles from "./ForgotPassword.module.css"
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useFormValidation } from '../../hooks/useFormValidation';
import { Loader } from '../../components/loader/loader';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../services/reducers/authSlice';

function ForgotPassword() {

  const { values, errors, isValid, handleChange } = useFormValidation();
  const { loading, error } = useSelector(store => store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(forgotPassword(values.email))
      .then((res) => {
        navigate("/reset-password");
      });
  }

  if (Cookies.get("token")) return <Navigate to="/" replace />

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
          pattern='[a-z0-9]+@[a-z]+\.{1,1}[a-z]{2,}'
        />
        {loading ?
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
        {error && <span className='error'>{error}</span>}
        <p className={styles.text}>Вспомнили пароль?
          <Link to="/login" className={styles.link}> Войти</Link>
        </p>
      </form>
    </main>
  )
}

export default ForgotPassword;
