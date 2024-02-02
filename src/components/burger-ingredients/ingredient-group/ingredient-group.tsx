import { IngredientType } from "../../../utils/types";
import styles from "./ingredient-group.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import { useAppSelector } from "../../../services/hooks";
import { getConstructorIngredientsPath } from '../../../services/burger-constructor/selectors';
import { Link, useLocation } from "react-router-dom";

type Props = {
  ingredientType: IngredientType[];
  title: string;
  titleId: string;
};

const IngredientGroup = ({ ingredientType, title, titleId }: Props) => {
  const { bun, otherIngredients } = useAppSelector(getConstructorIngredientsPath);

  //функции для счетчика ингридиента
  const bunCounter = (ingredient: IngredientType): number => {
    if (bun) {
      return bun._id === ingredient._id ? 2 : 0;
    } else {
      return 0
    }
  };

  const ingredientCounter = (ingredient: IngredientType): number => {
    const otherIngredientsList = otherIngredients.filter((item: IngredientType) => item.name === ingredient.name);
    return otherIngredientsList.length;
  };

  const counter = (ingredient: IngredientType) => ingredient.type === 'bun' ? bunCounter(ingredient) : ingredientCounter(ingredient)

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
              <IngredientItem ingredient={ingredient} count={counter(ingredient)} />
            </Link>
          )
        })}
      </div>
    </section>
  )
};

export default IngredientGroup;