import { useMemo } from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../../utils/prop-types";
import styles from "./ingredients-list.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientsList = ({ ingredients }) => {

    //фильтрация массива ингридиентов
    const bun = useMemo(
        () =>
            ingredients.filter((ingredient) => {
                return ingredient.type === 'bun';
            }),
        [ingredients]
    );

    const otherIngredients = useMemo(
        () =>
            ingredients.filter((ingredient) => {
                return ingredient.type !== 'bun';
            }),
        [ingredients]
    );


    return (
        <div className={`${styles.list}`}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun[0].name} (верх)`}
                price={bun[0].price}
                thumbnail={bun[0].image}
            />
            <ul className={`${styles.otherIngredientsList} custom-scroll`}>
                {otherIngredients.map(ingredient => {
                    return (
                        <li key={ingredient._id} className={`${styles.listItem}`}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </li>
                    )
                })}
            </ul>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun[0].name} (низ)`}
                price={bun[0].price}
                thumbnail={bun[0].image}
            />
        </div>
    )
};

IngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default IngredientsList;