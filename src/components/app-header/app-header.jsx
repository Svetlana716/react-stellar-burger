import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Link } from 'react-router-dom';

const AppHeader = () => {

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <NavLink to="/" className={styles.menuLink}>
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                  <span className={isActive ? styles.activeLink : styles.inactiveLink}>Конструктор</span>
                </>
              )}
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/feed" className={styles.menuLink}>
            {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? 'primary' : 'secondary'} />
                  <span className={isActive ? styles.activeLink : styles.inactiveLink}>Лента заказов</span>
                </>
              )}
            </NavLink>
          </li>
        </ul>

        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>

        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <NavLink to="/profile" className={styles.menuLink}>
            {({ isActive }) => (
                <>
                  <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                  <span className={isActive ? styles.activeLink : styles.inactiveLink}>Личный кабинет</span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;