import { useState, useContext, useEffect } from "react";
import styles from "./burger-order.module.css";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";
import OrderDetails from "./order-details/order-details";
import { ConstructorContext } from "../../../services/constructor-context"
import { postOrder } from "../../../utils/api"

const BurgerOrder = () => {
    const { constructorState } = useContext(ConstructorContext);
    const { bun, ingredients, total } = constructorState;
    const [modalVisible, setModalVisible] = useState(false);
    const [orderInfo, setOrderInfo] = useState({
        name: '',
        order: {
            number: null
        },
        success: false,
    });

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const getIngredientsId = () => {
        if (bun !== null) {
            const bunId = bun._id;
            const ingredientsId = ingredients.map(item => item._id);
            return [bunId, ...ingredientsId, bunId]
        }
    };

    const ingredientsId = getIngredientsId();

    const handleMakeOrder = () => {
        postOrder(ingredientsId)
            .then((data) => {
                setOrderInfo({
                    ...orderInfo,
                    name: data.name,
                    order: {
                        ...orderInfo.order,
                        number: data.order.number
                    },
                    success: data.success,
                })
                handleOpenModal()
            })
            .catch(() => {
                setOrderInfo({
                    ...orderInfo,
                    success: false,
                })
            })
    };

    return (
        <section className={`${styles.burgerOrder}`}>
            <div className={`${styles.orderContainer}`}>
                <span className="text text_type_digits-medium">{total}</span>
                <CurrencyIcon type="primary" />
            </div>
            <Button onClick={handleMakeOrder} htmlType="button" type="primary" size="large">
                Оформить заказ
            </Button>
            {modalVisible && orderInfo.success &&
                <Modal onClose={handleCloseModal}>
                    <OrderDetails orderInfo={orderInfo} />
                </Modal>}
        </section>
    );
};

export default BurgerOrder;