import styles from "./account-page.module.css";
import CustomLink from "../../components/custom-link/custom-link";
import { logoutOfProfile } from "../../services/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getAuthInfoPath } from "../../services/auth/selectors";
import RequestMessage from "../../components/request-message/request-message";
import { useLocation } from "react-router-dom";

export const AccountPage = () => {
    const { loading } = useSelector(getAuthInfoPath);

    const location = useLocation();
    
    const paragraphContent = location.pathname === '/profile/orders' ? 'В этом разделе вы можете просмотреть свою историю заказов' : 'В этом разделе вы можете изменить свои персональные данные';

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutOfProfile());
    };

    return (
        <div className={styles.accountContainer}>
            <div className={styles.menuContainer}>
                <nav className={styles.menu}>
                    <ul className={styles.menuList}>
                        <li className={styles.menuItem}>
                            <CustomLink to="/profile">Профиль</CustomLink>
                        </li>
                        <li className={styles.menuItem}>
                            <CustomLink to="/profile/orders">История заказов</CustomLink>
                        </li>
                        <li className={styles.menuItem}>
                            <button className={styles.menuButton} onClick={handleLogout}>Выход</button>
                        </li>
                    </ul>
                </nav>
                {loading && <RequestMessage message='Загрузка...' />}
                <p className={styles.paragraph}>{paragraphContent}</p>
            </div>

            <div className={styles.contentContainer}>
                <Outlet/>
            </div>
        </div>
    );
};

export default AccountPage;