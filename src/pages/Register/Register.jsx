import React from 'react';
import styles from "./Register.module.css"
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, Navigate } from "react-router-dom"
import { useFormValidation } from '../../hooks/useFormValidation';
import { Loader } from '../../components/loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../services/reducers/authSlice';
import Cookies from 'js-cookie';

function Register() {

  const { values, errors, isValid, handleChange } = useFormValidation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(store => store.auth);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(register({ email: values["email"], password: values["password"], userName: values["name"] }))
      .then(res => {
        if (res.payload) {
          const pathname = localStorage.getItem("redirectPath");
          navigate(pathname, { replace: true });
        }
      })
      .catch(err => console.log(err))
  }

  if (Cookies.get("token")) return <Navigate to="/" replace />;

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Регистрация</h2>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={values["name"] || ""}
          name={'name'}
          error={errors["name"] ? true : false}
          errorText={errors["name"]}
          minLength={3}
          maxLength={20}
          required
        />
        <Input
          type={'email'}
          placeholder={'E-mail'}
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
        <PasswordInput
          errorText={errors}
          value={values["password"] || ""}
          name={'password'}
          extraClass="mb-2"
          onChange={handleChange}
          error={errors["password"] ? true : false}
          errorText={errors["password"]}
          minLength={8}
          maxLength={28}
          required
        />
        {loading ?
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
        {error && <span className='error'>{error}</span>}
        <p className={styles.text}>Уже зарегистрированы?
          <Link to="/login" className={styles.link}> Войти</Link>
        </p>
      </form>
    </main>
  )
}

export default Register;
