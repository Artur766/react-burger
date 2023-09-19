import React from 'react';
import styles from "./Register.module.css"
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom"

function Register() {

  const [value, setValue] = React.useState('');
  const inputRef = React.useRef(null);


  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <h2 className={styles.title}>Регистрация</h2>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setValue(e.target.value)}
          value={value}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Input
          type={'text'}
          placeholder={'E-mail'}
          onChange={e => setValue(e.target.value)}
          value={value}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <PasswordInput
          value={value}
          name={'password'}
          extraClass="mb-2"
          onChange={e => setValue(e.target.value)}
        />
        <Button htmlType="button" type="primary" size="medium" extraClass={styles.btn}>
          Зарегистрироваться
        </Button>
        <p className={styles.text}>Уже зарегистрированы?
          <Link to="/login" className={styles.link}> Войти</Link>
        </p>
      </form>
    </main>
  )
}

export default Register;
