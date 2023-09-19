import React from 'react'
import styles from "./Login.module.css"
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";

function Login() {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef(null);

  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <h2 className={styles.title}>Вход</h2>
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
          Войти
        </Button>
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