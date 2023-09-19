import React from 'react';
import styles from "./ResetPassword.module.css";
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";

function ResetPassword() {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef(null);

  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <PasswordInput
          value={value}
          name={'password'}
          placeholder={"Введите новый пароль"}
          extraClass="mb-2"
          onChange={e => setValue(e.target.value)}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => setValue(e.target.value)}
          value={value}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Button htmlType="button" type="primary" size="medium" extraClass={styles.btn}>
          Сохранить
        </Button>
        <p className={styles.text}>Вспомнили пароль?
          <Link to="/login" className={styles.link}> Войти</Link>
        </p>
      </form>
    </main>
  )
}

export default ResetPassword;