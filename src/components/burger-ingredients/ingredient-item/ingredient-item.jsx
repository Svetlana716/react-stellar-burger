import styles from "./ingredient-item.module.css";

import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientItem = ({ingredient, count}) => {
    const {image, name, price} = ingredient;
    return (
        <div className={`${styles.card}`}>
            <Counter count={count} size="default" />
            <img className={`${styles.image}`} src={image} alt={name} />
            <div className={`${styles.price}`}>
                <p className="text text_type_digits-default">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-default ${styles.name}`}>{name}</p>
        </div>
    )
  }
  
  export default IngredientItem;