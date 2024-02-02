import styles from "./other-ingredient-elements.module.css";
import { useAppDispatch, useAppSelector } from "../../../../services/hooks";
import { useDrop } from "react-dnd";
import { getConstructorIngredientsPath } from "../../../../services/burger-constructor/selectors";
import DropTarget from "../drop-target/drop-target";
import ConstructorIngredientItem from './constructor-ingredient-item/constructor-ingredient-item';
import { addOtherIngredient } from "../../../../services/burger-constructor/slice";


const OtherIngredientElements = () => {
const { otherIngredients } = useAppSelector(getConstructorIngredientsPath);
  const dispatch = useAppDispatch();

  const [{ opacity }, dropRef ] = useDrop({
    accept: "otherIngredients",
    collect: monitor => ({
        opacity: monitor.isOver() ? 0.5 : 1,
    }),
    drop(item) {
      dispatch(addOtherIngredient(item));
    }
  });


  return (
    <ul ref={dropRef} style={{ opacity }} className={`${styles.otherIngredientsList} custom-scroll`}>
                {
                otherIngredients.length > 0 ?
               ( otherIngredients.map((ingredient, index) => {
                    return (
                        <li key={ingredient.uniqId}>
                            <ConstructorIngredientItem ingredient={ingredient} index={index}/>
                        </li>
                    )
                })
                ) : (<DropTarget type='center' />)
                }
            </ul>
  );
};

export default OtherIngredientElements;