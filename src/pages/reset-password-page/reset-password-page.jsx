import styles from "../../components/auth-page-wrapper/auth-page-wrapper.module.css";
import AuthPageWrapper from "../../components/auth-page-wrapper/auth-page-wrapper";
import { useState } from "react";
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from "react-router-dom";
import { resetPasswordSecondStep } from "../../utils/api";

export const ResetPasswordPage = () => {

  const [form, setValue] = useState({ password: '', token: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const { password, token } = form;

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/login');
  };

  const handleResetPasswordSecondStep = (e) => {
    e.preventDefault();
    resetPasswordSecondStep(password, token)
    .then(res => {
      if (res && res.success) {
        navigate('/reset-password');
      }
  })
};

  return (
    <AuthPageWrapper>
      <form onSubmit={handleResetPasswordSecondStep}>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <PasswordInput
          onChange={onChange}
          value={password}
          placeholder={'Введите новый пароль'}
          name={'password'}
          extraClass="mb-6"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChange}
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