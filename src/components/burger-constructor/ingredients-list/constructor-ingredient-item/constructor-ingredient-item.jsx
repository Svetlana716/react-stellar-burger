import { useContext, useCallback } from "react";
import styles from "./constructor-ingredient-item.module.css";
import { ingredientPropType } from "../../../../utils/prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorContext } from "../../../../services/constructor-context"


const ConstructorIngredientItem = ({ ingredient }) => {
    const { constructorDispatch } = useContext(ConstructorContext);
    const { image, name, price } = ingredient;

    const handleDeleteIngredient = useCallback ((ingredient) => {
        if (ingredient.type !== 'bun') {
        constructorDispatch({type: 'deleteIngredients', payload: ingredient})
        }
      }, []);

    return (
        <div className={`${styles.constructorIngredientItem}`} onClick={() => handleDeleteIngredient(ingredient)}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
            />
        </div>
    )
};

ConstructorIngredientItem.propTypes = {
    ingredient: ingredientPropType.isRequired,
};

export default ConstructorIngredientItem;