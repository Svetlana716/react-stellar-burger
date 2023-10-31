import styles from "./order-details.module.css";
import tickImage from "../../../../images/done.png";
import PropTypes from "prop-types";

const OrderDetails = ({ orderInfo }) => {
    const { name, order } = orderInfo;
    const { number } = order;
    return (
        <>
            <p className={`${styles.orderNumber} text text_type_digits-large`}>{number}</p>
            <h3 className={`${styles.orderName} text text_type_main-medium`}>{name}</h3>
            <img className={`${styles.image}`} src={tickImage} alt="иконка принятого заказа" />
            <p className={`${styles.orderStatus} text text_type_main-small`}>Ваш заказ начали готовить</p>
            <p className={`${styles.orderMessage} text text_type_main-small text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
        </>

    );
};

OrderDetails.propTypes = {
    orderInfo: PropTypes.object.isRequired,
};

export default OrderDetails;