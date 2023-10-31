import { useContext } from "react";
import styles from "./ingredients-list.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorContext } from "../../../services/constructor-context";
import ConstructorIngredientItem from "../ingredients-list/constructor-ingredient-item/constructor-ingredient-item"

const IngredientsList = () => {
    const { constructorState } = useContext(ConstructorContext);
    const { bun, ingredients } = constructorState;

    return (
        <section className={`${styles.list}`}>
            {bun && <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
            />}
            <ul className={`${styles.ingredientsList} custom-scroll`}>
                {ingredients.map((ingredient, index) => {
                    return (
                        <li key={index}>
                            <ConstructorIngredientItem ingredient={ingredient} />
                        </li>
                    )
                })}
            </ul>
            
            {bun && <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
            />}
        </section>
    )
};

export default IngredientsList;