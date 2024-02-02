import styles from "../../components/auth-page-wrapper/auth-page-wrapper.module.css";
import AuthPageWrapper from "../../components/auth-page-wrapper/auth-page-wrapper";
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from "react-router-dom";
import { resetPasswordFirstStep } from "../../utils/api";
import { useForm } from "../../hooks/useForm";

export const ForgotPasswordPage = () => {

  const { values, handleChange } = useForm({ email: '' });

  const { email } = values;

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/login');
  };

  const handleResetPasswordFirstStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPasswordFirstStep(email)
      .then(res => {
        localStorage.setItem("resetPassword", res.message);
        navigate('/reset-password', { replace: true });
      })
  };

  return (
    <AuthPageWrapper>
      <form className={styles.form} onSubmit={handleResetPasswordFirstStep}>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <EmailInput
          onChange={handleChange}
          value={email}
          name={'email'}
          placeholder="Укажите e-mail"
          isIcon={false}
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">Восстановить</Button>
      </form>

      <div className={styles.linkContainer}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
        <Button htmlType="submit" type="secondary" size="medium" onClick={goToLoginPage} extraClass={styles.button}>Войти</Button>
      </div>
    </AuthPageWrapper>
  );
};

export default ForgotPasswordPage;