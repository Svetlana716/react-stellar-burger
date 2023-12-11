import { postOrderData } from '../../utils/api';
import { RESET_CONSTRUCTOR } from '../burger-constructor/actions';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';


export const postOrder = (ingredientsId) => (dispatch) => {
    dispatch({
        type: POST_ORDER_REQUEST,
    })

    postOrderData(ingredientsId)
        .then(res => {
            dispatch({
                type: POST_ORDER_SUCCESS,
                payload: res
            })
        })
        .catch(() => {
            dispatch({
                type: POST_ORDER_FAILED,
            })
        })
};

export const resetConstructor = () => ({
    type: RESET_CONSTRUCTOR,
});