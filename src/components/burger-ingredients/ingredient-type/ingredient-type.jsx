import { useCallback, useMemo } from "react";
import { useModal } from "../../../hooks/useModal"
import PropTypes from "prop-types";
import { ingredientPropType } from "../../../utils/prop-types";
import styles from "./ingredient-type.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import Modal from "../../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIngredient, unsetCurrentIngredient } from '../../../services/ingredient-details/actions';
import { getConstructorIngredientsPath } from '../../../services/burger-constructor/selectors';
import { getIngredientDetailsPath } from '../../../services/ingredient-details/selectors';

const IngredientType = ({ title, ingredientType }) => {
  const {bun, otherIngredients} = useSelector(getConstructorIngredientsPath);
  const { currentIngredient } = useSelector(getIngredientDetailsPath);
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();

  //функции для счетчика ингридиента
  const bunCounter = (ingredient) => {
    if (bun !== null) {
      return bun._id === ingredient._id ? 2 : 0;
    }
  };

  const ingredientCounter = (ingredient) => {
    const otherIngredientsList = otherIngredients.filter(item => item.name === ingredient.name);
      return otherIngredientsList.length;
  };


  // обработчики открытия/закрытия модалок с изменением стора
  const handleOpenModal = useCallback ((ingredient) => {
    dispatch(setCurrentIngredient(ingredient))
    openModal()
  }, []);

  const handleCloseModal = useCallback (() => {
    dispatch(unsetCurrentIngredient())
    closeModal()
  }, []);
  
  return (
    <section>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={`${styles.typeList}`}>
        {ingredientType.map(ingredient => {
          return (
            <li onClick={() => handleOpenModal(ingredient)} key={ingredient._id} className={`${styles.listItem}`}>
              <IngredientItem ingredient={ingredient} count={ingredient.type === 'bun' ? bunCounter(ingredient) : ingredientCounter(ingredient)} />
            </li>
          )
        })}
      </ul>
      {isModalOpen && currentIngredient &&
        <Modal onClose={handleCloseModal}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>}
    </section>
  )
};

IngredientType.propTypes = {
  ingredientType: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  title: PropTypes.string.isRequired,
};

export default IngredientType;