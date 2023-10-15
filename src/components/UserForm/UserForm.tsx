import React, { FormEvent, FC, } from 'react'
import { PasswordInput, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useFormValidation } from '../../hooks/useFormValidation';
import styles from "./UserForm.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { resetSubmitMessageRequest, updateUserInfo } from '../../services/reducers/authSlice';
import { RootState } from '../../services';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const UserForm: FC = () => {
  const { values, errors, setErrors, handleChange, reset } = useFormValidation();
  const { user, error, successUpdateUser } = useSelector((store: RootState) => store.auth);
  const [isEditing, setIsEditing] = React.useState(false);

  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

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

  function handleCancel(): void {
    reset({
      "name": user.name,
      "email": user.email,
      "password": ""
    })
    setErrors({});
    setIsEditing(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    // @ts-ignore 
    dispatch(updateUserInfo({ name: values.name, email: values.email, password: values.password }));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <EmailInput
        placeholder='Имя'
        onChange={handleChange}
        value={values["name"] || ""}
        name={'name'}
        extraClass={styles.input}
        minLength={3}
        maxLength={20}
        isIcon={!isEditing}
        //@ts-ignore
        type="text"
        error={errors["name"] ? true : false}
        errorText={errors["name"]}
      />
      <EmailInput
        placeholder='Логин'
        onChange={handleChange}
        value={values["email"] || ""}
        name={'email'}
        extraClass={styles.input}
        isIcon={!isEditing}
        //@ts-ignore
        error={errors["email"] ? true : false}
        errorText={errors["email"]}
      />
      <PasswordInput
        placeholder='Пароль'
        onChange={handleChange}
        value={values["password"] || ""}
        name={'password'}
        icon="EditIcon"
        minLength={8}
        maxLength={28}
        //@ts-ignore
        errorText={errors["password"]}
        error={errors["password"] ? true : false}
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
