import styles from "./order-details.module.css";

import  tickImage  from "../../../../images/done.png"; 


const OrderDetails = () => {
    return (
        <>
            <p className={`${styles.orderNumber} text text_type_digits-large`}>034536</p>
            <h3 className="text text_type_main-medium">идентификатор заказа</h3>
            <img className={`${styles.image}`} src={tickImage} alt="иконка принятого заказа" />
            <p className={`${styles.orderStatus} text text_type_main-small`}>Ваш заказ начали готовить</p>
            <p className={`${styles.orderMessage} text text_type_main-small text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
        </>

    );
};


export default OrderDetails;