import { useState, useEffect, useReducer } from "react";
import styles from "./app.module.css";
import { getData } from "../../utils/api"
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import RequestMessage from "../app/request-message/request-message";
import { IngredientsContext } from "../../services/ingredients-context";
import { ConstructorContext } from "../../services/constructor-context";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const initialConstructorState = {
    bun: null,
    ingredients: [],
    total: 0,
  };



  const constructorReducer = (state, action) => {
    switch (action.type) {
      case 'bun':
        return {
          ...state,
          bun: action.payload,
          total: action.payload.price * 2,
        };

      case 'ingredients':
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload],
          total: state.total + action.payload.price,
        };

      case 'deleteIngredients':
        return {
          ...state,
          ingredients: state.ingredients.filter((item) => item._id !== action.payload._id),
          total: state.total - action.payload.price,
        };
          

      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  const [constructorState, constructorDispatch] = useReducer(constructorReducer, initialConstructorState);

  useEffect(() => {
    setLoading(true);
    getData()
      .then((data) => {
        if (data && data.success) {
          setIngredients(data.data);
          setLoading(false);
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      })
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <div className={styles.burgerContainer}>
          {loading && <RequestMessage message={'Загрузка...'} />}
          {error && <RequestMessage message={'Произошла ошибка'} />}
          {!loading &&
            !error && (
              <>
                <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
                  <ConstructorContext.Provider value={{ constructorState, constructorDispatch }}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </ConstructorContext.Provider>
                </IngredientsContext.Provider>
              </>
            )}
        </div>
      </main>
    </div>
  );
}

export default App;
