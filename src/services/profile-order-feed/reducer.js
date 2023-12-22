import {
    WS_PROFILE_ORDER_FEED_CONNECTION_SUCCESS,
    WS_PROFILE_ORDER_FEED_CONNECTION_ERROR,
    WS_PROFILE_ORDER_FEED_CONNECTION_CLOSED,
    WS_PROFILE_ORDER_FEED_GET_MESSAGE,
} from "./actions";

const initialState = {
    wsConnected: false,
    connectingError: false,
    errorMessage: '',

    profileOrders: null,
};

export const wsProfileOrderFeedReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case WS_PROFILE_ORDER_FEED_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
                connectingError: false
            };
        case WS_PROFILE_ORDER_FEED_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                connectingError: false,
            };
        case WS_PROFILE_ORDER_FEED_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                connectingError: true,
                errorMessage: action.payload,
            };
        case WS_PROFILE_ORDER_FEED_GET_MESSAGE:
            return {
                ...state,
                connectingError: false,
                profileOrders: action.payload.orders,
            }
        default:
            return state;
    }
}