import styles from "./order-item.module.css";
import { OrderType } from "../../utils/types";
import { useMemo } from "react";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderIngredients from "./order-ingredients/order-ingredients";
import { getIngredientsOnly } from "../../services/burger-ingredients/selectors";
import { useAppSelector } from "../../services/hooks";
import { useLocation } from "react-router-dom";

type Props = {
    order: OrderType;
  };

export const OrderItem = ({ order }: Props) => {
    
    const { createdAt, ingredients, name, number, status } = order;

    const allIngredients = useAppSelector(getIngredientsOnly);

    //все ингридиенты с дублями
    const allOrderIngredients = useMemo(
        () =>
        ingredients?.map((orderIngredient) =>
        allIngredients.find((allIngredient) => allIngredient._id === orderIngredient)),
        [ingredients, allIngredients]
    );

    //расчет общей стоимости заказа
    const orderPrice = useMemo(
        () =>
        allOrderIngredients?.reduce((acc, ingredient) =>  acc + ingredient!.price, 0),
        [allOrderIngredients]
    );

    //список ингридиентов без дублей
    const orderIngredients = useMemo(
        () =>
        allIngredients.filter((ingredient) => {
            return ingredients.includes(ingredient._id);
        }),
        [allIngredients, ingredients]
    );

    const location = useLocation();

    let content;

    switch (status) {
        case 'done':
            content = 'Выполнен';
            break;

        case 'created':
            content = 'Готовится';
            break;

        case 'pending':
            content = 'Создан';
            break;

        default:
            content = 'Что-то пошло не так(';
    };

    const style = status === 'done' ? `${styles.doneStatus} ${styles.status}` : styles.status;

    const orderStatus = location.pathname.startsWith('/profile/orders') ? <p className={style}>{content}</p> : null;

    return (
        <div className={styles.orderContainer}>
            <div className={styles.numberAndDateContainer}>
                <p className={styles.orderNumber}>{`#${number}`}</p>
                <FormattedDate className={styles.date} date={new Date(createdAt)} />
            </div>
            <h3 className={styles.orderTitle}>{name}</h3>
            {orderStatus}
            <div className={styles.burgerContainer}>
                <OrderIngredients orderIngredients={orderIngredients} />
                <div className={styles.priceContainer}>
                    <span>{orderPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

export default OrderItem;