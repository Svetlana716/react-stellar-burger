import styles from "./orders-list.module.css";
import PropTypes from "prop-types";
import { orderPropType } from "../../utils/prop-types";
import OrderItem from "../order-item/order-item";
import { Link, useLocation } from "react-router-dom";

export const OrdersList = ({ orders, linkPath }) => {
   
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

OrdersList.propTypes = {
    orders: PropTypes.arrayOf(orderPropType).isRequired,
    linkPath: PropTypes.string.isRequired,
};

export default OrdersList;