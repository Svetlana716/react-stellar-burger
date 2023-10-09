import React from "react";
import styles from "./ingredient-type.module.css";
import IngredientItem from "../ingredient-item/ingredient-item"

const IngredientType = ({title, ingredientType}) => {
// колличество конкретного ингридиента
const ingredientCount = React.useMemo(
    () =>
    ingredientType.reduce(function (prevVal, item) {
        if (!prevVal[item]) {
          prevVal[item] = 1;
        } else {
          prevVal[item] += 1;
        }
      
        return prevVal;
      }, {}),
    [ingredientType]
);  

    return (
        <section>
            <h2 className="text text_type_main-medium">{title}</h2>
            <ul className={`${styles.typeList}`}>
                {ingredientType.map(ingredient => {
                    return (
                        <li key={ingredient.id} className={`${styles.listItem}`}>
                            <IngredientItem ingredient={ingredient} count={ingredientCount.prevVal}/>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
  }
  
  export default IngredientType;