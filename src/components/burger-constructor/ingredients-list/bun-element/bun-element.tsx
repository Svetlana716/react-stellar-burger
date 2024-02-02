import { useAppDispatch, useAppSelector } from "../../../../services/hooks";
import { useDrop } from "react-dnd";
import { getConstructorIngredientsPath } from "../../../../services/burger-constructor/selectors";
import DropTarget from "../drop-target/drop-target";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { addBun } from "../../../../services/burger-constructor/slice";
import { IngredientType } from "../../../../utils/types";

type Props = {
  type: 'top' | 'bottom';
};

const BunElement = ({ type }: Props) => {
  const { bun } = useAppSelector(getConstructorIngredientsPath);
  const dispatch = useAppDispatch();

  const [{ opacity }, dropRef] = useDrop({
    accept: "bun",
    collect: monitor => ({
      opacity: monitor.isOver() ? 0.5 : 1,
    }),
    drop: (item: IngredientType) => dispatch(addBun(item)),
  });

  return (
    <div ref={dropRef} style={{ opacity }}>
      {
        bun ?
          (<ConstructorElement
            type={type}
            isLocked={true}
            text={`${bun.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
            price={bun.price}
            thumbnail={bun.image} />)
          :
          (<DropTarget type={type} />)
      }
    </div>
  );
};

export default BunElement;