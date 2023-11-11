import PropTypes from "prop-types";
import styles from "./other-ingredient-elements.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { getConstructorIngredientsPath } from "../../../../services/burger-constructor/selectors";
import DropTarget from "../drop-target/drop-target";
import ConstructorIngredientItem from './constructor-ingredient-item/constructor-ingredient-item';
import { addOtherIngredient } from "../../../../services/burger-constructor/actions";


const OtherIngredientElements = ({type}) => {
const { otherIngredients } = useSelector(getConstructorIngredientsPath);
  const dispatch = useDispatch();

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
                ) :
                (<DropTarget type={type} />)
                }
            </ul>
  );
};

OtherIngredientElements.propTypes = {
  type: PropTypes.string.isRequired
  }

export default OtherIngredientElements;