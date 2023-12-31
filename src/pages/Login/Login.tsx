import React, { FC, FormEvent } from 'react'
import styles from "./Login.module.css"
import { Input, PasswordInput, Button, } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from "react-router-dom";
import { useFormValidation } from '../../hooks/useFormValidation';
import { Loader } from '../../components/loader/loader';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { login } from '../../services/reducers/authSlice';
import { IAuthResult } from '../../utils/types';

const Login: FC = () => {
  const { values, errors, isValid, handleChange } = useFormValidation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(store => store.auth);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(login({ email: values["email"], password: values["password"] }))
      .then((res: unknown) => {
        if ((res as IAuthResult).payload) {
          const pathname = localStorage.getItem("redirectPath");
          if (pathname) {
            navigate(pathname, { replace: true });
          }
        }
      })
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
          required
        />
        <PasswordInput
          value={values["password"] || ""}
          name={'password'}
          extraClass="mb-2"
          onChange={handleChange}
          minLength={8}
          maxLength={28}
          required
          //@ts-ignore
          error={errors["password"] ? true : false}
          errorText={errors["password"]}
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