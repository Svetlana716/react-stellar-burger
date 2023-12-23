import styles from "./order-feed-details.module.css";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { getIngredientsPath } from "../../services/burger-ingredients/selectors";
import { getTotalOrderFeedPath } from "../../services/total-order-feed/selectors";
import { getProfileOrderFeedPath } from "../../services/profile-order-feed/selectors";
import { getOrder } from "../../services/order-details/actions";

import IngredientItem from "./ingredient-item/ingredient-item";

export const OrderFeedDetails = () => {
    const dispatch = useDispatch();
    const { number } = useParams();
    const { allIngredients } = useSelector(getIngredientsPath);

    const { totalOrders } = useSelector(getTotalOrderFeedPath);
    const { profileOrders } = useSelector(getProfileOrderFeedPath);

    const order = useSelector((store) => {
        let order = totalOrders?.find(order => order.number === +number);
        if (order) {
            return order;
        };

        order = profileOrders?.find(order => order.number === +number);
        if (order) {
            return order;
        };

        order = store.orderDetails.orderData?.[0];
        if (order) {
            return order;
        };

        return null;
    });

    useEffect(() => {
        if (!order) {
            dispatch(getOrder(number));
        }
    }, []);

    //все ингридиенты с дублями
    const allOrderIngredients = order?.ingredients.map((orderIngredient) =>
        allIngredients.find((allIngredient) => allIngredient._id === orderIngredient)
    );

    //расчет общей стоимости заказа
    const orderPrice = allOrderIngredients?.reduce((acc, ingredient) => acc + ingredient.price, 0);

    //список ингридиентов без дублей
    const orderIngredients = allIngredients.filter((ingredient) => {
        return order?.ingredients.includes(ingredient._id);
    });

    //счетчик ингридиентов в заказе
    const counter = (ingredientId) => {
        let counter = 0;
        order?.ingredients.forEach((item) => {
            if (item === ingredientId) {
                counter++;
            }
        });
        return counter;
    }

    if (!order) {
        return null;
    }

    const { createdAt, status, name } = order;

    let orderStatus;

    switch (status) {
        case 'done':
            orderStatus = 'Выполнен';
            break;

        case 'created':
            orderStatus = 'Готовится';
            break;

        case 'pending':
            orderStatus = 'Создан';
            break;

        default:
            orderStatus = 'Что-то пошло не так(';
    };

    return (
        <div className={styles.wrapper}>
            <p className={styles.orderNumber}>{`#${number}`}</p>
            <h3 className={styles.orderTitle}>{name}</h3>
            <p className={styles.orderStatus}>{orderStatus}</p>
            <p className={styles.orderSubtitle}>Состав:</p>
            <ul className={styles.ingredientsList}>
                {
                    orderIngredients.map((ingredient) => {
                        return (
                            <IngredientItem key={ingredient._id} counter={counter(ingredient._id)} ingredient={ingredient} />
                        )
                    })
                }
            </ul>
            <div className={styles.dateAndPriceContainer}>
                <FormattedDate className={styles.date} date={new Date(createdAt)} />
                <div className={styles.priceContainer}>
                    <span>{orderPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

export default OrderFeedDetails;