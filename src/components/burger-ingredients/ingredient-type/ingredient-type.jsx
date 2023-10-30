import { useState, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../../utils/prop-types";
import styles from "./ingredient-type.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import Modal from "../../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { ConstructorContext } from "../../../services/constructor-context"

const IngredientType = ({ title, ingredientType }) => {
  const { constructorDispatch } = useContext(ConstructorContext);
  // стейт компонента
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);

  // обработчики событий(изменение стейта)
  const handleOpenModal = useCallback ((item) => {
    setCurrentIngredient(item);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback (() => {
    setModalVisible(false);
  }, []);

  const handleAddIngredient = useCallback ((ingredient) => {
    ingredient.type === 'bun' ?
    constructorDispatch({type: 'bun', payload: ingredient}) : 
    constructorDispatch({type: 'ingredients', payload: ingredient})
  }, []);
  
  return (
    <section>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={`${styles.typeList}`}>
        {ingredientType.map(ingredient => {
          return (
            <li /* onClick={() => handleOpenModal(ingredient)} */ onClick={() => handleAddIngredient(ingredient)} key={ingredient._id} className={`${styles.listItem}`}>
              <IngredientItem ingredient={ingredient} count={1} />
            </li>
          )
        })}
      </ul>
      {modalVisible && currentIngredient &&
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