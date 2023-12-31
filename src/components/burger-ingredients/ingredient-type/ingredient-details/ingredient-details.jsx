import styles from "./ingredient-details.module.css";
import { ingredientPropType } from "../../../../utils/prop-types";

const IngredientDetails = ({ingredient}) => {
    const {image_large, name, calories, proteins, fat, carbohydrates} = ingredient;
    return (
        <>
            <h3 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h3>
            <img src={image_large} alt={name} />
            <p className={`${styles.ingredientName} text text_type_main-medium`}>{name}</p>
            <ul className={`${styles.nutrientsContainer}`}>
                <li className={`${styles.nutrient}`}>
                    <p className={`${styles.nutrientTitle} text text_type_main-default text_color_inactive`}>Калории,ккал</p>
                    <p className={`${styles.nutrientValue} text text_type_digits-default text_color_inactive`}>{calories}</p>
                </li>
                <li className={`${styles.nutrient}`}>
                    <p className={`${styles.nutrientTitle} text text_type_main-default text_color_inactive`}>Белки, г</p>
                    <p className={`${styles.nutrientValue} text text_type_digits-default text_color_inactive`}>{proteins}</p>
                </li>
                <li className={`${styles.nutrient}`}>
                    <p className={`${styles.nutrientTitle} text text_type_main-default text_color_inactive`}>Жиры, г</p>
                    <p className={`${styles.nutrientValue} text text_type_digits-default text_color_inactive`}>{fat}</p>
                </li>
                <li className={`${styles.nutrient}`}>
                    <p className={`${styles.nutrientTitle} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
                    <p className={`${styles.nutrientValue} text text_type_digits-default text_color_inactive`}>{carbohydrates}</p>
                </li>
            </ul>
        </>

    );
};

IngredientDetails.propTypes = {
    ingredient: ingredientPropType.isRequired,
  };

export default IngredientDetails ;