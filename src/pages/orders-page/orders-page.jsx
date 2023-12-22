import styles from "./orders-page.module.css";
import { getProfileOrderFeedPath } from "../../services/profile-order-feed/selectors";
import RequestMessage from "../../components/request-message/request-message";
import OrdersList from "../../components/orders-list/orders-list";
//для сокет-соединения
import { profileOrderFeedConnect, profileOrderFeedDisconnect } from '../../services/profile-order-feed/actions';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const OrdersPage = () => {
    const dispatch = useDispatch();

    const accessToken = localStorage.getItem('accessToken');
    const accessTokenWithoutBearer = accessToken.replace('Bearer', '').trimStart();
    
    useEffect(() => {
        dispatch(profileOrderFeedConnect(`wss://norma.nomoreparties.space/orders?token=${accessTokenWithoutBearer}`));
        return () => {
            dispatch(profileOrderFeedDisconnect());
        }
    }, []);

    const { wsConnected, connectingError, errorMessage, profileOrders } = useSelector(getProfileOrderFeedPath);

    return (
        <div className={styles.feedContainer}>
            {!wsConnected && <RequestMessage message={'Соединение устанавливается...'} />}
            {connectingError && <RequestMessage message={errorMessage} />}
            {wsConnected && !connectingError && profileOrders?.length > 0 && (
                    <OrdersList orders={profileOrders} linkPath={'/profile/orders'}/>
            )}
        </div>
    );
};

export default OrdersPage;