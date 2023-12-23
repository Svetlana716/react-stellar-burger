import {
    WS_TOTAL_ORDER_FEED_CONNECTION_SUCCESS,
    WS_TOTAL_ORDER_FEED_CONNECTION_ERROR,
    WS_TOTAL_ORDER_FEED_CONNECTION_CLOSED,
    WS_TOTAL_ORDER_FEED_GET_MESSAGE,
} from "./actions";

const initialState = {
    wsConnected: false,
    connectingError: false,
    errorMessage: '',

    totalOrders: null,
    total: null,
    totalToday: null,
};

export const wsTotalOrderFeedReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case WS_TOTAL_ORDER_FEED_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
                connectingError: false
            };
        case WS_TOTAL_ORDER_FEED_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                connectingError: false,
            };
        case WS_TOTAL_ORDER_FEED_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                connectingError: true,
                errorMessage: action.payload,
            };
        case WS_TOTAL_ORDER_FEED_GET_MESSAGE:
            return {
                ...state,
                connectingError: false,
                totalOrders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }
        default:
            return state;
    }
}