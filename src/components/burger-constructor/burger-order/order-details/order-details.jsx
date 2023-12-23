import styles from "./order-details.module.css";
import tickImage from "../../../../images/done.png";
import { useSelector } from "react-redux";
import { getOrderInfoPath } from '../../../../services/order-details/selectors';
import { getOrderNumberPath } from '../../../../services/order-details/selectors';
import RequestMessage from "../../../request-message/request-message";

const OrderDetails = () => {
    const { name, loading, error, success } = useSelector(getOrderInfoPath);
    const { number } = useSelector(getOrderNumberPath);

    return (
        <div className={styles.wrapper}>
            {loading && !success && <RequestMessage message={'Загрузка...'} />}
            {error && !success && <RequestMessage message={'Произошла ошибка'} />}
            {!loading && !error && success &&
                <>
                    <p className={styles.orderNumber}>{number}</p>
                    <h3 className={styles.orderName}>{name}</h3>
                    <img className={styles.image} src={tickImage} alt="иконка принятого заказа" />
                    <p className={styles.orderStatus}>Ваш заказ начали готовить</p>
                    <p className={styles.orderMessage}>Дождитесь готовности на орбитальной станции</p>
                </>
            }
        </div>

    );
};

export default OrderDetails;