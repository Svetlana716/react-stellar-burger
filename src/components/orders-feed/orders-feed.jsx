import styles from "./orders-feed.module.css";
import OrdersList from "../orders-list/orders-list";
import { useSelector } from "react-redux";
import { getTotalOrderFeedPath } from "../../services/total-order-feed/selectors";

export const OrdersFeed = () => {
    const { totalOrders } = useSelector(getTotalOrderFeedPath);

    //проверка на валидность данных ингридиентов
    const isNull = (value) => {
        return value.some(item => item === null || undefined)
    };
    const checkOrdersArray = totalOrders?.filter(order => !isNull(order?.ingredients));

    return (
        <section className={styles.ordersFeedContainer}>
            <h2 className={styles.feedTitle}>Лента заказов</h2>
            <OrdersList orders={checkOrdersArray} linkPath={'/feed'} />
        </section>
    );
};

export default OrdersFeed;