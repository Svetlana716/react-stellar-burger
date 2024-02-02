import { useCallback, useRef, ReactNode } from "react";
import styles from "./constructor-ingredient-item.module.css";
import { IngredientType } from "../../../../../utils/types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../../../../services/hooks";
import { deleteOtherIngredient } from '../../../../../services/burger-constructor/slice';
import { useDrag, useDrop } from "react-dnd";
import { changeTheOrderOfIngredients } from "../../../../../services/burger-constructor/slice";
import type { XYCoord } from 'dnd-core';

type Props = {
    ingredient: IngredientType;
    index: number;
    children?: ReactNode;
  };

const ConstructorIngredientItem = ({ ingredient, index} : Props) => {
    const dispatch = useAppDispatch();
    const { image, name, price } = ingredient;
    const ref = useRef<HTMLDivElement>(null);

    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredients',
        item: () => {
            return { index }
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0 : 1
        })
    });

    const [, dropRef] = useDrop({
        accept: 'ingredients',
        hover: (item : { index: number }, monitor) => {
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
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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
            dispatch(deleteOtherIngredient(ingredient.uniqId))
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

export default ConstructorIngredientItem;