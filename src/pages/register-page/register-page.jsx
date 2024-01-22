import styles from "../../components/auth-page-wrapper/auth-page-wrapper.module.css";
import AuthPageWrapper from "../../components/auth-page-wrapper/auth-page-wrapper";
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from "react-router-dom";
import { registrationUser } from "../../services/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoPath } from "../../services/user/selectors";
import RequestMessage from "../../components/request-message/request-message";
import { useForm } from "../../hooks/useForm";

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector(getUserInfoPath);

  const { values, handleChange } = useForm({ email: '', password: '', name: '' });

  const { email, password, name } = values;

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/login');
  };

  const handleRegisterUser = (e) => {
    e.preventDefault();
    dispatch(registrationUser(values));
  };

  return (
    <AuthPageWrapper>
      <form className={styles.form} onSubmit={handleRegisterUser}>
        <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={handleChange}
          value={email}
          name={'email'}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={password}
          name={'password'}
          extraClass="mb-6"
        />
        {loading && <RequestMessage message={'Загрузка...'} />}
        {error && <RequestMessage error={error} message={error.message} />}

        <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">Зарегистрироваться</Button>
      </form>
      <div className={styles.linkContainer}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
        <Button htmlType="button" type="secondary" size="medium" onClick={goToLoginPage} extraClass={styles.button}>Войти</Button>
      </div>
    </AuthPageWrapper>
  );
};

export default RegisterPage;