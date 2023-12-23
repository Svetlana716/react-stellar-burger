import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { getConstructorIngredientsPath } from "../../../../services/burger-constructor/selectors";
import DropTarget from "../drop-target/drop-target";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { addBun } from "../../../../services/burger-constructor/actions";


const BunElement = ({ type }) => {
  const { bun } = useSelector(getConstructorIngredientsPath);
  const dispatch = useDispatch();

  const [{ opacity }, dropRef] = useDrop({
    accept: "bun",
    collect: monitor => ({
      opacity: monitor.isOver() ? 0.5 : 1,
    }),
    drop(item) {
      dispatch(addBun(item));
    }
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

BunElement.propTypes = {
  type: PropTypes.string.isRequired
}

export default BunElement;