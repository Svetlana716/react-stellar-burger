import PropTypes from "prop-types";
import { ingredientPropType } from "../../../utils/prop-types";
import styles from "./ingredient-type.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import { useSelector } from "react-redux";
import { getConstructorIngredientsPath } from '../../../services/burger-constructor/selectors';
import { Link, useLocation } from "react-router-dom";

const IngredientType = ({ title, titleId, ingredientType }) => {
  const { bun, otherIngredients } = useSelector(getConstructorIngredientsPath);

  //функции для счетчика ингридиента
  const bunCounter = (ingredient) => {
    if (bun !== null) {
      return bun._id === ingredient._id ? 2 : 0;
    }
  };

  const ingredientCounter = (ingredient) => {
    const otherIngredientsList = otherIngredients.filter(item => item.name === ingredient.name);
    return otherIngredientsList.length;
  };

  const location = useLocation();

  return (
    <section>
      <h2 className="text text_type_main-medium" id={titleId}>{title}</h2>
      <div className={`${styles.typeList}`}>
        {ingredientType.map(ingredient => {
          return (
            <Link
              key={ingredient._id}
              to={`/ingredients/${ingredient._id}`}
              state={{ background: location }}
              className={styles.link}
            >
              <IngredientItem ingredient={ingredient} count={ingredient.type === 'bun' ? bunCounter(ingredient) : ingredientCounter(ingredient)} />
            </Link>
          )
        })}
      </div>
    </section>
  )
};

IngredientType.propTypes = {
  ingredientType: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  title: PropTypes.string.isRequired,
  titleId: PropTypes.string.isRequired,
};

export default IngredientType;