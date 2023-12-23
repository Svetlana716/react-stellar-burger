import styles from "../../components/auth-page-wrapper/auth-page-wrapper.module.css";
import AuthPageWrapper from "../../components/auth-page-wrapper/auth-page-wrapper";
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from "react-router-dom";
import { loginToProfile } from "../../services/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { getAuthInfoPath } from "../../services/auth/selectors";
import RequestMessage from "../../components/request-message/request-message";
import { useForm } from "../../hooks/useForm";

const LoginPage = () => {
    const dispatch = useDispatch();

    const { loading, error, message } = useSelector(getAuthInfoPath);

    const { values, handleChange } = useForm({ email: '', password: '' });

    const { email, password } = values;

    const navigate = useNavigate();

    const goToRegisterPage = () => {
        navigate('/register');
    };

    const goToForgotPasswordPage = () => {
        navigate('/forgot-password');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginToProfile(email, password));
    };

    return (
        <AuthPageWrapper>
            <form className={styles.form} onSubmit={handleLogin}>
                <h2 className="text text_type_main-medium mb-6">Вход</h2>
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
                {error && <RequestMessage error={error} message={message} />}
                <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">Войти</Button>
            </form>

            <div className={styles.linkContainer}>
                <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
                <Button htmlType="button" type="secondary" size="medium" onClick={goToRegisterPage} extraClass={styles.button}>Зарегистрироваться</Button>
            </div>

            <div className={styles.linkContainer}>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
                <Button htmlType="button" type="secondary" size="medium" onClick={goToForgotPasswordPage} extraClass={styles.button}>Восстановить пароль</Button>
            </div>
        </AuthPageWrapper>
    );
}

export default LoginPage;