import { useState, useContext } from "react";
import {useModal} from "../../../hooks/useModal"
import styles from "./burger-order.module.css";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";
import OrderDetails from "./order-details/order-details";
import RequestMessage from "../../app/request-message/request-message";
import { ConstructorContext } from "../../../services/constructor-context"
import { postOrder } from "../../../utils/api"

const BurgerOrder = () => {
    const { constructorState, constructorDispatch } = useContext(ConstructorContext);
    const { bun, ingredients, total } = constructorState;
    const { isModalOpen, openModal, closeModal } = useModal();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [orderInfo, setOrderInfo] = useState({
        name: '',
        order: {
            number: null
        },
        success: false,
    });

    const getIngredientsId = () => {
        if (bun !== null) {
            const bunId = bun._id;
            const ingredientsId = ingredients.map(item => item._id);
            return [bunId, ...ingredientsId, bunId]
        }
    };

    const ingredientsId = getIngredientsId();

    const handleMakeOrder = () => {
        setLoading(true);
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
                openModal()
            })
            .catch(() => {
                setOrderInfo({
                    ...orderInfo,
                    success: false,
                })
                setError(true);
            })
            .finally(() => {
                setLoading(false);
                constructorDispatch({type: 'resetConstructor'});
            })
    };
    
    return (
        <section className={`${styles.burgerOrder}`}>
            <div className={`${styles.orderContainer}`}>
                <span className="text text_type_digits-medium">{total}</span>
                <CurrencyIcon type="primary" />
            </div>
            {loading && <RequestMessage message={'Загрузка...'} />} 
            {loading && <Button style={{display:'none'}} onClick={handleMakeOrder} htmlType="button" type="primary" size="large">
                Оформить заказ
            </Button>}
            {!bun && <Button disabled onClick={handleMakeOrder} htmlType="button" type="primary" size="large">
                Оформить заказ
            </Button>}
            {error && <RequestMessage message={'Произошла ошибка'} />}
            {!loading && !error && bun && 
            <Button onClick={handleMakeOrder} htmlType="button" type="primary" size="large">
                Оформить заказ
            </Button>}
            
            {isModalOpen && orderInfo.success &&
                <Modal onClose={closeModal}>
                    <OrderDetails orderInfo={orderInfo} />
                </Modal>}
        </section>
    );
};

export default BurgerOrder;