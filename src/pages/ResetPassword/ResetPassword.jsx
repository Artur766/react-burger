import React from 'react';
import styles from "./ResetPassword.module.css";
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormValidation } from '../../hooks/useFormValidation';
import { Loader } from '../../components/loader/loader';
import { resetPassword } from '../../utils/api';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

function ResetPassword() {

  const { values, errors, isValid, handleChange } = useFormValidation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState("");
  const navigate = useNavigate();
  const { resetDone } = useSelector(store => store.auth);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    resetPassword(values["password"], values["cod"])
      .then(res => {
        navigate("/login", { replace: true })
      })
      .catch(err => setIsError(err.message))
      .finally(() => setIsLoading(false));
  }

  if (!resetDone) { // если пользователь не проходил этап forgot-password возвращаем его туда
    return <Navigate to="/forgot-password" replace />
  }

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <PasswordInput
          value={values["password"] || ""}
          error={errors["password"] ? true : false}
          errorText={errors["password"]}
          name={'password'}
          placeholder={"Введите новый пароль"}
          extraClass="mb-2"
          onChange={handleChange}
          maxLength={30}
          minLength={8}
          required
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={values["cod"] || ""}
          name={'cod'}
          error={errors["cod"] ? true : false}
          errorText={errors["cod"]}
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
            extraClass={styles.btn}
            disabled={!isValid}
          >
            Сохранить
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

export default ResetPassword;