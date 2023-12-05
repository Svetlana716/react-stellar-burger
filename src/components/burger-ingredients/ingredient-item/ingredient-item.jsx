import styles from "./ingredient-item.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../../utils/prop-types";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

const IngredientItem = ({ ingredient, count }) => {
    const { image, name, price, type } = ingredient;
 
    const [{ opacity }, dragRef] = useDrag({
        type: type === 'bun' ? 'bun' : 'otherIngredients',
        item: ingredient,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <div ref={dragRef} className={`${styles.card}`} style={{ opacity }}>
            {count > 0 && <Counter count={count} size="default" />}
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