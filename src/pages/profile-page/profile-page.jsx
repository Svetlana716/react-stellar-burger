import styles from "./profile-page.module.css";
import { PasswordInput, Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from "react-redux";
import { getAuthInfoPath } from "../../services/auth/selectors";
import { changeUser } from "../../services/auth/actions";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";

export const ProfilePage = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(getAuthInfoPath);

    const initialState = {
        email: user.email,
        password: '',
        name: user.name,
    };

    const { values, setValues, handleChange } = useForm(initialState);

    const { email, password, name } = values;

    const handleUserDataChange = (e) => {
        e.preventDefault();
        dispatch(changeUser(email, name));
    };

    const handleResetForm = () => {
        setValues(initialState);
    };

    return (
        <form className={styles.form} onSubmit={handleUserDataChange} onReset={handleResetForm}>
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
            <div className={styles.buttonsContainer}>
                <Button htmlType="reset" type="secondary" size="medium">Отмена</Button>
                <Button htmlType="submit" type="primary" size="large" extraClass="">Сохранить</Button>
            </div>
        </form>
    );
};

export default ProfilePage;