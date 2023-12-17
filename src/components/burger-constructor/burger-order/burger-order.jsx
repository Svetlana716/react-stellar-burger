import { useModal } from "../../../hooks/useModal";
import styles from "./burger-order.module.css";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";
import OrderDetails from "./order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getConstructorIngredientsPath } from '../../../services/burger-constructor/selectors';
// thunk для запроса данных с сервера
import { postOrder } from '../../../services/order-details/actions';

const BurgerOrder = () => {
    const dispatch = useDispatch(); 

    const { bun, otherIngredients, totalPrice } = useSelector(getConstructorIngredientsPath);

    const { isModalOpen, closeModal, openModal } = useModal();

    //функция, создающая массив из id ингридиентов для post запроса 
    const getIngredientsId = () => {
        if (bun !== null) {
            const bunId = bun._id;
            const otherIngredientsId = otherIngredients.map(item => item._id);
            return [bunId, ...otherIngredientsId, bunId]
        }
    };
    
    const handleMakeOrder = () => {
        dispatch(postOrder(getIngredientsId()));
        openModal();
    };
    
    return (
        <section className={`${styles.burgerOrder}`}>
            <div className={`${styles.orderContainer}`}>
                <span className="text text_type_digits-medium">{totalPrice}</span>
                <CurrencyIcon type="primary" />
            </div>
            {!bun && <Button disabled htmlType="button" type="primary" size="large">
                Оформить заказ</Button>}
            {bun && <Button onClick={handleMakeOrder} htmlType="button" type="primary" size="large">
                Оформить заказ</Button>}
            
            {isModalOpen && 
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>}
        </section>
    );
};

export default BurgerOrder;