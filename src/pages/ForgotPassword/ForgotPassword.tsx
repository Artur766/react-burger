import React, { FormEvent, FC } from 'react';
import styles from "./ForgotPassword.module.css"
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from "react-router-dom"
import { useFormValidation } from '../../hooks/useFormValidation';
import { Loader } from '../../components/loader/loader';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { forgotPassword } from '../../services/reducers/authSlice';

const ForgotPassword: FC = () => {

  const { values, errors, isValid, handleChange } = useFormValidation();
  const { loading, error } = useSelector(store => store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(forgotPassword({ email: values.email }))
      .then(() => {
        navigate("/reset-password");
      });
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
