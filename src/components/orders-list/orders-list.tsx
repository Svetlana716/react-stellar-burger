import styles from "./orders-list.module.css";
import { OrderType } from "../../utils/types";
import OrderItem from "../order-item/order-item";
import { Link, useLocation } from "react-router-dom";

type Props = {
    orders: OrderType[];
    linkPath: string;
  };

export const OrdersList = ({ orders, linkPath }: Props) => {
   
    const location = useLocation();

    const reversedOrders = [...orders].reverse();

    const ordersArray = location.pathname === '/profile/orders' ? reversedOrders : orders;

    return (
        <div className={styles.ordersList}>
            {
                ordersArray.map(order => {
                    return (
                        <Link
                            key={order._id}
                            to={`${linkPath}/${order.number}`}
                            state={{ background: location }}
                            className={styles.link}
                        >
                            <OrderItem order={order} />
                        </Link>
                    )
                })
            }
        </div>
    );
};

export default OrdersList;