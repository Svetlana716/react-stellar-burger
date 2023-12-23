import styles from "./ingredient-item.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../../utils/prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const IngredientItem = ({ ingredient, counter }) => {

    const {image_mobile, name, price} = ingredient;

    return (
        <li className={styles.ingredientItem}>
            <div className={styles.ingredientImageContainer}>
                <img className={styles.ingredientImage} src={image_mobile} alt={name} />
            </div>
            <p className={styles.ingredientTitle}>{name}</p>
            <div className={styles.priceContainer}>
                    <span>{`${counter} x ${price}`}</span>
                    <CurrencyIcon type="primary" />
                </div>
        </li>
    );
};

IngredientItem.propTypes = {
    ingredient: ingredientPropType.isRequired,
    count: PropTypes.number,
};

export default IngredientItem;