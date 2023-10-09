import styles from "./app.module.css";
import { data } from "../../utils/data";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor"

const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <h1 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h1>
        <div className={styles.burgerContainer}>
          <BurgerIngredients ingredients={data}/>
          <BurgerConstructor ingredients={data}/>
        </div>
      </main>
    </div>
  );
}

export default App;
