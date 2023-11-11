import styles from "./order-details.module.css";
import tickImage from "../../../../images/done.png";
import { useSelector } from "react-redux";
import { getOrderInfoPath } from '../../../../services/order-details/selectors';

const OrderDetails = () => {
    const orderInfo = useSelector(getOrderInfoPath);
    const  name  = orderInfo.name;
    const  number  = orderInfo.order.number;

    console.log(number);
    // все равно не получается ((
    
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

export default OrderDetails;