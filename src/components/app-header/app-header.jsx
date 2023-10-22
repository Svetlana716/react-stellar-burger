import { useState } from "react";

import styles from "./app-header.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  const [state, setState] = useState('constructor');
    return (
      <header className={`${styles.header}`}>
        <div className={`${styles.container}`}>
        <a className={`${styles.logo}`} href="#">
          <Logo />
        </a>
          <nav className={`${styles.menu}`}>
            <ul className={`${styles.menuList}`}>
                <li className={`${styles.menuItem}`} onClick={() => setState('constructor')}>
                  <a className={`${styles.menuLink}`} href="#">
                    <BurgerIcon type={state === 'constructor'? 'primary' : 'secondary'} />
                    <span className={`text text_type_main-default ${state !== 'constructor' && 'text_color_inactive'}`}>Конструктор</span>
                  </a>
                </li>
                <li className={`${styles.menuItem}`} onClick={() => setState('orders')}>
                  <a className={`${styles.menuLink}`} href="#">
                    <ListIcon type={state === 'orders'? 'primary' : 'secondary'} />
                    <span className={`text text_type_main-default ${state !== 'orders' && 'text_color_inactive'}`}>Лента заказов</span>
                  </a>
                </li>
                <li className={`${styles.menuItem}`} onClick={() => setState('profile')}>
                  <a className={`${styles.menuLink}`} href="#">
                    <ProfileIcon type={state === 'profile'? 'primary' : 'secondary'} />
                    <span className={`text text_type_main-default ${state !== 'profile' && 'text_color_inactive'}`}>Личный кабинет</span>
                  </a>
                </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  
  export default AppHeader;