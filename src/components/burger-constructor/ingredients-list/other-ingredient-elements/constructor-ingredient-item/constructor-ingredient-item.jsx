import { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./constructor-ingredient-item.module.css";
import { ingredientPropType } from "../../../../../utils/prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { DELETE_OTHER_INGREDIENT } from '../../../../../services/burger-constructor/actions';
import { useDrag, useDrop } from "react-dnd";
import { changeTheOrderOfIngredients } from "../../../../../services/burger-constructor/actions";

const ConstructorIngredientItem = ({ ingredient, index}) => {
    const dispatch = useDispatch();
    const { image, name, price, _id } = ingredient;
    const ref = useRef(null);

    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredients',
        item: () => {
            return { _id, index}
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0 : 1
        })
    });

    const [, dropRef] = useDrop({
        accept: 'ingredients',
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch(changeTheOrderOfIngredients(dragIndex, hoverIndex));
            
            item.index = hoverIndex;
        }
    });

    dragRef(dropRef(ref));

    const handleDeleteIngredient = useCallback((ingredient) => {
        if (ingredient.type !== 'bun') {
            dispatch({ type: DELETE_OTHER_INGREDIENT, payload: ingredient })
        }
    }, [ingredient]);

    return (
        <div ref={ref} style={{ opacity }} className={`${styles.constructorIngredientItem}`}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={() => handleDeleteIngredient(ingredient)}
            />
        </div>
    )
};

ConstructorIngredientItem.propTypes = {
    ingredient: ingredientPropType.isRequired,
    index: PropTypes.number.isRequired,
};

export default ConstructorIngredientItem;