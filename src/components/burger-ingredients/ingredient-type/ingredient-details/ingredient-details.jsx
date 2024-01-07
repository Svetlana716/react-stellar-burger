import styles from "./ingredient-details.module.css";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getIngredientsOnly } from '../../../../services/burger-ingredients/selectors';

const IngredientDetails = () => {

    const allIngredients = useSelector(getIngredientsOnly);
    const { ingredientId } = useParams();

    const getIngredientById = (id) => {
        return allIngredients.find((ingredient) => ingredient._id === id);
    };

    const ingredient = getIngredientById(ingredientId);

    if (!ingredient) {
        return null;
    }

    const { image_large, name, calories, proteins, fat, carbohydrates } = ingredient;

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Детали ингредиента</h3>
            <img src={image_large} alt={name} />
            <p className={styles.ingredientName}>{name}</p>
            <ul className={`${styles.nutrientsContainer}`}>
                <li className={`${styles.nutrient}`}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className='text text_type_digits-default text_color_inactive'>{calories}</p>
                </li>
                <li className={`${styles.nutrient}`}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{proteins}</p>
                </li>
                <li className={`${styles.nutrient}`}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{fat}</p>
                </li>
                <li className={`${styles.nutrient}`}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{carbohydrates}</p>
                </li>
            </ul>
        </div>

    );
};

export default IngredientDetails;