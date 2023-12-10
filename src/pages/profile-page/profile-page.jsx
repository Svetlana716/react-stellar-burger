import styles from "./profile-page.module.css";
import { useState } from "react";
import { PasswordInput, Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from "react-redux";
import { getAuthInfoPath } from "../../services/auth/selectors";
import { changeUser } from "../../services/auth/actions";
import { useDispatch } from "react-redux";

export const ProfilePage = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(getAuthInfoPath);

    const initialState = {
        email: user.email,
        password: '',
        name: user.name,
    };

    const [form, setValue] = useState(initialState);

    const { email, password, name } = form;

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleUserDataChange = (e) => {
        e.preventDefault();
        dispatch(changeUser(email, name));
    };

    const handleResetForm = () => {
        setValue(initialState);
    };

    return (
        <form className={styles.form} onSubmit={handleUserDataChange} onReset={handleResetForm}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onChange}
                value={name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <EmailInput
                onChange={onChange}
                value={email}
                name={'email'}
                placeholder="E-mail"
                isIcon={false}
                extraClass="mb-6"
            />
            <PasswordInput
                onChange={onChange}
                value={password}
                name={'password'}
                extraClass="mb-6"
            />
            <div className={styles.buttonsContainer}>
                <Button htmlType="reset" type="secondary" size="medium">Отмена</Button>
                <Button htmlType="submit" type="primary" size="large" extraClass="">Сохранить</Button>
            </div>
        </form>
    );
};

export default ProfilePage;