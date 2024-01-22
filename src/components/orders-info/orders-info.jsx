import styles from "./orders-info.module.css";
import { useSelector } from "react-redux";
import { getTotalOrderFeedPath } from "../../services/total-order-feed/selectors";

export const OrdersInfo = () => {

    const { totalOrders, total, totalToday } = useSelector(getTotalOrderFeedPath);

    const readyOrderNumber = totalOrders.filter(order => order.status === "done").slice(0, 10);
    const underwayOrderNumber = totalOrders.filter(order => order.status !== "done").slice(0, 10);

    return (
        <section className={styles.ordersInfoContainer}>
            <div className={styles.ordersStatus}>
                <h3 className={`${styles.title} mb-6`}>Готовы:</h3>
                <ul className={styles.ordersList}>
                    {
                        readyOrderNumber.map(order => {
                            return (
                                <li key={order._id} className={styles.orderItem}>
                                    <p className={styles.readyOrderNumber}>{order.number}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <div className={styles.ordersStatus}>
                <h3 className={`${styles.title} mb-6`}>В работе:</h3>
                <ul className={styles.ordersList}>
                    {
                        underwayOrderNumber.map(order => {
                            return (
                                <li key={order._id} className={styles.orderItem}>
                                    <p className={styles.underwayOrderNumber}>{order.number}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <div className={styles.statisticsContainer}>
                <h3 className={styles.title}>Выполнено за все время:</h3>
                <p className={styles.statisticsNumber}>{total}</p>
            </div>

            <div className={styles.statisticsContainer}>
                <h3 className={styles.title}>Выполнено за сегодня:</h3>
                <p className={styles.statisticsNumber}>{totalToday}</p>
            </div>
        </section>
    );
};

export default OrdersInfo;