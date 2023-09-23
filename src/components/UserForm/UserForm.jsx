import React from 'react'
import { PasswordInput, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useFormValidation } from '../../hooks/useFormValidation';
import styles from "./UserForm.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { resetSubmitMessageRequest, updateUserInfo } from '../../services/reducers/authSlice';

function UserForm() {
  const { values, errors, setErrors, handleChange, reset } = useFormValidation();
  const { user, error, successUpdateUser } = useSelector(store => store.auth);
  const [isEditing, setIsEditing] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user) {
      reset({ "name": user.name, "email": user.email, })
    };
  }, [user.name, user.email]);

  React.useEffect(() => {
    if (values.name !== user.name || user.email !== values.email || (values.password !== "" && values.password !== undefined)) {
      setIsEditing(true);
      dispatch(resetSubmitMessageRequest());
    } else {
      setIsEditing(false);
    };
  }, [user, values, setIsEditing]);

  function handleCancel() {
    reset({
      "name": user.name,
      "email": user.email,
      "password": ""
    })
    setErrors({});
    setIsEditing(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUserInfo({ name: values.name, email: values.email, password: values.password }));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <EmailInput
        type="text"
        placeholder='Имя'
        onChange={handleChange}
        value={values["name"] || ""}
        name={'name'}
        icon="EditIcon"
        extraClass={styles.input}
        error={errors["name"] ? true : false}
        errorText={errors["name"]}
        minLength={3}
        maxLength={20}
        isIcon={!isEditing}
      />
      <EmailInput
        type="email"
        placeholder='Логин'
        onChange={handleChange}
        value={values["email"] || ""}
        name={'email'}
        icon="EditIcon"
        extraClass={styles.input}
        pattern='[a-z0-9]+@[a-z]+\.{1,1}[a-z]{2,}'
        error={errors["email"] ? true : false}
        errorText={errors["email"]}
        isIcon={!isEditing}
      />
      <PasswordInput
        placeholder='Пароль'
        onChange={handleChange}
        value={values["password"] || ""}
        name={'password'}
        icon="EditIcon"
        minLength={8}
        maxLength={28}
        error={errors["password"] ? true : false}
        errorText={errors["password"]}
      />
      {error && <span className='error'>{error}</span>}
      {(successUpdateUser && !isEditing) && <span className='succes'>user data has been successfully updated</span>}
      {isEditing &&
        <div className={styles.containerButton}>

          < Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={styles.btn}
            onClick={handleCancel}
          >
            Отмена
          </Button>
          < Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={styles.btn}
          >
            Сохранить
          </Button>
        </div>
      }
    </form >
  )
}

export default UserForm;
