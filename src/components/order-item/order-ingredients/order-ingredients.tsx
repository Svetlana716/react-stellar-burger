import styles from "./order-ingredients.module.css";
import { IngredientType } from "../../../utils/types";

type Props = {
    orderIngredients: IngredientType[];
  };

export const OrderIngredients = ({ orderIngredients }: Props) => {

    return (
        <ul className={styles.ingredientsList}>
            {
                orderIngredients.slice(0, 6).reverse().map((ingredient, index) => {
                    return (
                        <li key={ingredient._id} className={styles.ingredientItem}>
                            {orderIngredients.length > 6 && index === 0 &&  (
                                    <p className={styles.ingredientsCounter}>{`+${orderIngredients.length - 6}`}</p>
                            )}
                            <img className={index !== 0 && orderIngredients.length > 6 ? styles.ingredientImage  : `${styles.ingredientImage}  ${styles.lastIngredientImage}`} src={ingredient.image_mobile} alt={ingredient.name} />
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default OrderIngredients; 