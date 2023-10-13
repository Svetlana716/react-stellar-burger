import React from "react";
import styles from "./app.module.css";
/* import { data } from "../../utils/data"; */

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import RequestMessage from "../app/request-message/request-message"

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

function checkResponse (res) { 
  if (!res.ok) { 
    return Promise.reject(`Ошибка: ${res.status}`); 
  } 
  return res.json(); 
};

function getData () { 
  return fetch(apiUrl) 
.then(checkResponse) 
}; 

const App = () => {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  React.useEffect(() => {
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
