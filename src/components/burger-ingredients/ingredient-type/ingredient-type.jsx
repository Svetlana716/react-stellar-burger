import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../../utils/prop-types";
import styles from "./ingredient-type.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import Modal from "../../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details"

const IngredientType = ({ title, ingredientType }) => {
  // стейт компонента
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState(null);

  // обработчики событий(изменение стейта)
  const handleOpenModal = React.useCallback ((item) => {
    setCurrentIngredient(item);
    setModalVisible(true);
  }, []);

  const handleCloseModal = React.useCallback (() => {
    setModalVisible(false);
  }, []);

  // колличество конкретного ингридиента(для счетчика ингридиента)
  const ingredientCount = React.useMemo(
    () =>
      ingredientType.reduce(function (prevVal, item) {
        if (!prevVal[item]) {
          prevVal[item] = 1;
        } else {
          prevVal[item] += 1;
        }

        return prevVal;
      }, {}),
    [ingredientType]
  );

  return (
    <section>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={`${styles.typeList}`}>
        {ingredientType.map(ingredient => {
          return (
            <li onClick={() => handleOpenModal(ingredient)} key={ingredient._id} className={`${styles.listItem}`}>
              <IngredientItem ingredient={ingredient} count={ingredientCount.prevVal} />
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