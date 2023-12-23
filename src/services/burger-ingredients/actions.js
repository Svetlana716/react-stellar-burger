import { getIngredientsData } from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_ITEMS_FAILED';

export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

export const setCurrentTab = (tab) => ({
    type: SET_CURRENT_TAB,
    payload: tab,
});

export const getIngredients = () => (dispatch) => {

    dispatch({
        type: GET_INGREDIENTS_REQUEST,
    })

    getIngredientsData()
        .then((res) => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: GET_INGREDIENTS_FAILED,
            })
        })
};