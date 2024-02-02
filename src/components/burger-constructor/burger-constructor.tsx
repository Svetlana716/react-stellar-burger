import styles from "./burger-constructor.module.css";
import IngredientsList from "./ingredients-list/ingredients-list";
import BurgerOrder from "./burger-order/burger-order";

const BurgerConstructor = () => {

    return (
        <section className={`${styles.constructor}`}>
            <IngredientsList />
            <BurgerOrder />
        </section>
    );
};

export default BurgerConstructor;