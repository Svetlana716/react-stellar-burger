import styles from "./order-details.module.css";
import tickImage from "../../../../images/done.png";
import { useSelector } from "react-redux";
import { getOrderInfoPath } from '../../../../services/order-details/selectors';
import { getOrderNumberPath } from '../../../../services/order-details/selectors';
import RequestMessage from "../../../app/request-message/request-message";

const OrderDetails = () => {
    const { name } = useSelector(getOrderInfoPath);
    const { number } = useSelector(getOrderNumberPath);
    const { loading, error, success } = useSelector(getOrderInfoPath);

    return (
        <>
            {loading && !success && <RequestMessage message={'Загрузка...'} />}
            {error && !success && <RequestMessage message={'Произошла ошибка'} />}
            {!loading && !error && success &&
                <>
                    <p className={`${styles.orderNumber} text text_type_digits-large`}>{number}</p>
                    <h3 className={`${styles.orderName} text text_type_main-medium`}>{name}</h3>
                    <img className={`${styles.image}`} src={tickImage} alt="иконка принятого заказа" />
                    <p className={`${styles.orderStatus} text text_type_main-small`}>Ваш заказ начали готовить</p>
                    <p className={`${styles.orderMessage} text text_type_main-small text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
                </>
            }
        </>

    );
};

export default OrderDetails;