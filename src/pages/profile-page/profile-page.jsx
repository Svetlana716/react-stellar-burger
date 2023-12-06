import styles from "./profile-page.module.css";
import { useState } from "react";
import { PasswordInput, Input, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthInfoPath } from "../../services/auth/selectors";

export const ProfilePage = () => {
  const { user } = useSelector(getAuthInfoPath);  
  
  const [form, setValue] = useState({
    email: user.email, 
    password: user.password,
    name: user.name, 
});

  const { email, password, name } = form;

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

    console.log(user);

    return (
        <div className={styles.profileContainer}>
            <div className={styles.menuContainer}>
                <nav className={styles.menu}>
                    <ul className={styles.menuList}>
                        <li className={styles.menuItem}>
                            <NavLink className={`${styles.menuLink} ${({ isActive }) => isActive ? "" : 'text_color_inactive'}`} to="/">Профиль</NavLink>
                        </li>
                        <li className={styles.menuItem}>
                            <NavLink className={`${styles.menuLink} ${({ isActive }) => isActive ? "" : 'text_color_inactive'}`} to="/">История заказов</NavLink>
                        </li>
                        <li className={styles.menuItem}>
                            <NavLink className={`${styles.menuLink} ${({ isActive }) => isActive ? "" : 'text_color_inactive'}`} to="/">Выход</NavLink>
                        </li>
                    </ul>
                </nav>
                <p className={'text text_type_main-default text_color_inactive'}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <div className={styles.inputsContainer}>
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
            </div>
        </div>
    );
};

export default ProfilePage;