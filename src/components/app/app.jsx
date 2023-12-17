import styles from "./app.module.css";
import {  useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../app-header/app-header";
import RequestMessage from "../app/request-message/request-message";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useSelector, useDispatch } from "react-redux";
// thunk для запроса данных с сервера
import { getIngredients } from '../../services/burger-ingredients/actions';
import { getIngredientsPath } from "../../services/burger-ingredients/selectors";

const App = () => {
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients())
    }, [])

  const { allIngredients, ingredientsRequest, ingredientsFailed } = useSelector(getIngredientsPath);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <div className={styles.burgerContainer}>
          {ingredientsRequest && <RequestMessage message={'Загрузка...'} />}
          {ingredientsFailed && <RequestMessage message={'Произошла ошибка при получении данных'} />}
          {!ingredientsRequest && !ingredientsFailed && allIngredients.length > 0 && (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
