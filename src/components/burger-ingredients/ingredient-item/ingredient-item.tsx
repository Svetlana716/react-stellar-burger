import styles from "./ingredient-item.module.css";
import { IngredientType } from "../../../utils/types";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

type Props = {
    ingredient: IngredientType;
    count: number;
  };

const IngredientItem = ({ ingredient, count }: Props) => {
    const { image, name, price, type } = ingredient;
 
    const [{ opacity }, dragRef] = useDrag({
        type: type === 'bun' ? 'bun' : 'otherIngredients',
        item: ingredient,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <div ref={dragRef} className={`${styles.card}`} style={{ opacity }}>
            {count > 0 && <Counter count={count} size="default" />}
            <img className={`${styles.image}`} src={image} alt={name} />
            <div className={`${styles.price}`}>
                <p className="text text_type_digits-default">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-default ${styles.name}`}>{name}</p>
        </div>
    )
};

export default IngredientItem;