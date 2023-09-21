import React from 'react'
import styles from "./Login.module.css"
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from "react-router-dom";
import { useFormValidation } from '../../hooks/useFormValidation';
import { Loader } from '../../components/loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/reducers/authSlice';
function Login() {
  const { values, errors, isValid, handleChange } = useFormValidation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(store => store.auth);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login({ email: values["email"], password: values["password"] }))
      .then(res => {
        if (res.payload) {
          navigate("/", { replace: true });
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Вход</h2>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={handleChange}
          value={values["email"] || ""}
          name={'email'}
          error={errors["email"] ? true : false}
          errorText={errors["email"]}
          pattern='[a-z0-9]+@[a-z]+\.{1,1}[a-z]{2,}'
        />
        <PasswordInput
          value={values["password"] || ""}
          name={'password'}
          extraClass="mb-2"
          onChange={handleChange}
          error={errors["password"] ? true : false}
          errorText={errors["password"]}
          minLength={8}
          maxLength={28}
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
            Войти
          </Button>
        }
        {error && <span className='error'>{error}</span>}
        <div className={styles.linksContainer}>
          <p className={styles.text}>Вы — новый пользователь?
            <Link to="/register" className={styles.link}> Зарегистрироваться</Link>
          </p>
          <p className={styles.text}>Забыли пароль?
            <Link to="/forgot-password" className={styles.link}> Восстановить пароль</Link>
          </p>
        </div>
      </form>
    </main>
  )
}

export default Login