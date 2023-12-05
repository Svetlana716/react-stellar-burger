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
        if (res && res.success) {
            dispatch({
                type: POST_ORDER_SUCCESS,
                payload: res
              })
        } else {
            dispatch({
                type: POST_ORDER_FAILED,
              })
        }
    })
    .catch(() => {
        dispatch({
            type: POST_ORDER_FAILED,
          })
    })
    .finally(() => {
        dispatch({
            type: RESET_CONSTRUCTOR,
          }) 
    })
};