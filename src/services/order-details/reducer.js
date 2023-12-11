import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
} from './actions';

const initialState = {
    name: '',
    order: {
        number: null
    },
    success: false,
    loading: false,
    error: false,
};

export const orderReducer = (state = initialState, action) => {

    switch (action.type) {
        case POST_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            }

        case POST_ORDER_SUCCESS:
            return {
                ...state,
                name: action.payload.name,
                order: {
                    ...state.order,
                    number: action.payload.order.number
                },
                success: action.payload.success,
                loading: false,
            }

        case POST_ORDER_FAILED:
            return {
                ...state,
                success: false,
                error: true,
                loading: false,
            }

        default:
            return state;
    }
};