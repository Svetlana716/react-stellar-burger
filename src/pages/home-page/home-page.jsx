import styles from "./home-page.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";

import RequestMessage from "../../components/request-message/request-message";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { getIngredientsPath } from "../../services/burger-ingredients/selectors";

const HomePage = () => {
  
  const { allIngredients, ingredientsRequest, ingredientsFailed } = useSelector(getIngredientsPath);
  
  return (
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
  );
}

export default HomePage;