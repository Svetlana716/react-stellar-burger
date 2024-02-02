import styles from "./orders-page.module.css";
import { getProfileOrderFeedPath } from "../../services/profile-order-feed/selectors";
import RequestMessage from "../../components/request-message/request-message";
import OrdersList from "../../components/orders-list/orders-list";
//для сокет-соединения
import { profileOrderFeedConnect, profileOrderFeedDisconnect } from '../../services/profile-order-feed/actions';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";

export const OrdersPage = () => {
    const dispatch = useAppDispatch();
    const { wsConnected, connectingError, profileOrders } = useAppSelector(getProfileOrderFeedPath);
    
    const accessToken = localStorage.getItem('accessToken');
    const accessTokenWithoutBearer = accessToken!.replace('Bearer', '').trimStart();
    
    useEffect(() => {
        dispatch(profileOrderFeedConnect(`wss://norma.nomoreparties.space/orders?token=${accessTokenWithoutBearer}`));
        return () => {
            dispatch(profileOrderFeedDisconnect());
        }
    }, []);

    //проверка на валидность данных ингридиентов
    const isNull = (value: string[]) => {
        return value.some(item => item === null || undefined)
    };
    const checkOrdersArray = profileOrders!?.filter(order => !isNull(order?.ingredients));

    return (
        <div className={styles.feedContainer}>
            {!wsConnected && <RequestMessage message={'Соединение устанавливается...'} />}
            {connectingError && <RequestMessage message={connectingError} />}
            {wsConnected && !connectingError && profileOrders!?.length > 0 && (
                    <OrdersList orders={checkOrdersArray} linkPath={'/profile/orders'}/>
            )}
        </div>
    );
};

export default OrdersPage;