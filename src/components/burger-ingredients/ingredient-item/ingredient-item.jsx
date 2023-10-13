import styles from "./ingredient-item.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../../utils/prop-types";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientItem = ({ingredient, count}) => {
    const {image, name, price} = ingredient;
    return (
        <div className={`${styles.card}`}>
            {count && 
                <Counter count={count} size="default" />}
            <img className={`${styles.image}`} src={image} alt={name} />
            <div className={`${styles.price}`}>
                <p className="text text_type_digits-default">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-default ${styles.name}`}>{name}</p>
        </div>
    )
  };

  IngredientItem.propTypes = {
    ingredient: ingredientPropType.isRequired,
    count: PropTypes.number,
  };

  export default IngredientItem;