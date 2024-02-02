import styles from "../../components/auth-page-wrapper/auth-page-wrapper.module.css";
import AuthPageWrapper from "../../components/auth-page-wrapper/auth-page-wrapper";
import { useState, useEffect } from "react";
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from "react-router-dom";
import { resetPasswordSecondStep } from "../../utils/api";
import { useForm } from "../../hooks/useForm";

export const ResetPasswordPage = () => {

  const { values, handleChange } = useForm({ password: '', token: '' });

  const { password, token } = values;

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/login');
  };

  const handleResetPasswordSecondStep: React.ReactEventHandler = (e) => {
    e.preventDefault();
    resetPasswordSecondStep(password, token)
      .then(() => {
        localStorage.removeItem("resetPassword");
        navigate('/login');
      })
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, []);

  return (
    <AuthPageWrapper>
      <form className={styles.form} onSubmit={handleResetPasswordSecondStep}>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <PasswordInput
          onChange={handleChange}
          value={password}
          placeholder={'Введите новый пароль'}
          name={'password'}
          extraClass="mb-6"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">Сохранить</Button>
      </form>

      <div className={styles.linkContainer}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
        <Button htmlType="submit" type="secondary" size="medium" onClick={goToLoginPage} extraClass={styles.button}>Войти</Button>
      </div>
    </AuthPageWrapper>
  );
};

export default ResetPasswordPage;