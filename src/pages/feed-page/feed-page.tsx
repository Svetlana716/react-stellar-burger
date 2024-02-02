import styles from "./feed-page.module.css";
import OrdersFeed from "../../components/orders-feed/orders-feed";
import OrdersInfo from "../../components/orders-info/orders-info";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getTotalOrderFeedPath } from "../../services/total-order-feed/selectors";
import RequestMessage from "../../components/request-message/request-message";
//для сокет-соединения
import { totalOrderFeedConnect, totalOrderFeedDisconnect } from '../../services/total-order-feed/actions';
import { useEffect } from "react";

export const FeedPage = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(totalOrderFeedConnect('wss://norma.nomoreparties.space/orders/all'));
        return () => {
            dispatch(totalOrderFeedDisconnect())
        }
    }, []);

    const { wsConnected, connectingError, totalOrders } = useAppSelector(getTotalOrderFeedPath);
    
    return (
        <div className={styles.feedContainer}>
            {!wsConnected && <RequestMessage message={'Соединение устанавливается...'} />}
            {connectingError && <RequestMessage message={connectingError} />}
            {wsConnected && !connectingError && totalOrders!?.length > 0 && (
                <>
                    <OrdersFeed />
                    <OrdersInfo />
                </>
            )}
        </div>
    );
};

export default FeedPage;