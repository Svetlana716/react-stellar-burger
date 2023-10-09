import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";
import IngredientsList from "./ingredients-list/ingredients-list";
import BurgerPrice from "./burger-price/burger-price"

const BurgerConstructor = ({ ingredients }) => {

    return (
        <section className={`${styles.constructor}`}>
            <IngredientsList ingredients={ingredients} />
            <BurgerPrice ingredients={ingredients} />
        </section>
    );
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerConstructor;