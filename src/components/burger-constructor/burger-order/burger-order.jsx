import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../../utils/prop-types";
import styles from "./burger-order.module.css";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";
import OrderDetails from "./order-details/order-details"

const BurgerOrder = ({ ingredients }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };
    // стоимость корзины
    const total = useMemo(
        () =>
        ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0),
        [ingredients]
    );

    return (
        <section className={`${styles.burgerOrder}`}>
            <div className={`${styles.orderContainer}`}>
                <span className="text text_type_digits-medium">{total}</span>
                <CurrencyIcon type="primary" />
            </div>
            <Button onClick={handleOpenModal} htmlType="button" type="primary" size="large">
                Оформить заказ
            </Button>
            {modalVisible && 
                <Modal onClose={handleCloseModal}>
                    <OrderDetails />
                </Modal>}
        </section>
    );
};

BurgerOrder.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerOrder;