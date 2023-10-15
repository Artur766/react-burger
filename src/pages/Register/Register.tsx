import React, { FC, FormEvent } from 'react';
import styles from "./Register.module.css"
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from "react-router-dom"
import { useFormValidation } from '../../hooks/useFormValidation';
import { Loader } from '../../components/loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../services/reducers/authSlice';
import { RootState } from '../../services';
import { IAuthResult } from '../../utils/types';

const Register: FC = () => {

  const { values, errors, isValid, handleChange } = useFormValidation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //@ts-ignore
    dispatch(register({ email: values["email"], password: values["password"], name: values["name"] }))
      .then((res: unknown) => {
        if ((res as IAuthResult).payload) {
          const pathname = localStorage.getItem("redirectPath");
          if (pathname) {
            navigate(pathname, { replace: true });
          }
        }
      })
      .catch((err: string) => console.log(err))
  }

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
        />
        <PasswordInput
          value={values["password"] || ""}
          name={'password'}
          extraClass="mb-2"
          onChange={handleChange}
          //@ts-ignore
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
