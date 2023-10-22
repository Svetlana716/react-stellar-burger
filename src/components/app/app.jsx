import  { useState, useEffect } from "react";
import styles from "./app.module.css";
import { getData } from "../../utils/api"
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import RequestMessage from "../app/request-message/request-message"

const App = () => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  useEffect(() => {
      setState({ ...state, isLoading: true });
      getData ()
      .then ((data) => {
        setState({ ...state, data: data.data, isLoading: false });
      })
      .catch(() => {
        setState({ ...state, hasError: true });
      })
  }, []);

  const { data, isLoading, hasError } = state;

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <div className={styles.burgerContainer}>
        {isLoading && <RequestMessage message={'Загрузка...'}/>}
        {hasError && <RequestMessage message={'Произошла ошибка'}/>}
        {!isLoading &&
          !hasError &&
          data.length && (
            <>
            <BurgerIngredients ingredients={data} />
            <BurgerConstructor ingredients={data} />
            </>
            )}
          </div>
      </main>
    </div>
  );
}

export default App;
