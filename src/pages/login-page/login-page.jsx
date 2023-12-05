import styles from "../../components/auth-page-wrapper/auth-page-wrapper.module.css";
import AuthPageWrapper from "../../components/auth-page-wrapper/auth-page-wrapper";
import { useState } from "react";
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const [form, setValue] = useState({ email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const goToRegisterPage = () => {
        navigate('/register');
    };

    const goToForgotPasswordPage = () => {
        navigate('/forgot-password');
    };

    return (
        <AuthPageWrapper>
            <h2 className="text text_type_main-medium mb-6">Вход</h2>
            <EmailInput
                onChange={onChange}
                value={form.email}
                name={'email'}
                placeholder="E-mail"
                isIcon={false}
                extraClass="mb-6"
            />
            <PasswordInput
                onChange={onChange}
                value={form.password}
                name={'password'}
                extraClass="mb-6"
            />
            <Button htmlType="button" type="primary" size="large" extraClass="mb-20">Войти</Button>

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