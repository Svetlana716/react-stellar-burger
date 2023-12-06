import styles from "./not-found-page.module.css";
import { Link } from 'react-router-dom';
import errorImage from "../../images/error.svg";

export const NotFoundPage = () => {

    return (
        <div className={styles.wrapper}>
          <h2 className={`text text_type_main-large mt-6 ${styles.title}`}>Страница не найдена</h2>
          <img className={styles.image} src={errorImage} alt="картинка страницы ошибки 404"/>
          <Link to="/"className={`text text_type_main-medium ${styles.link}`}>Вернуться на главную</Link>  
        </div>
        
    );
};

export default NotFoundPage;