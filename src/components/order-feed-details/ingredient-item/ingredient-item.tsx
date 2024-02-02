import styles from "./ingredient-item.module.css";
import { IngredientType } from "../../../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {
    ingredient: IngredientType;
    counter: number;
  };

export const IngredientItem = ({ ingredient, counter }: Props) => {

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

export default IngredientItem;