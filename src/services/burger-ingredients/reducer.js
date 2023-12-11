import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_CURRENT_TAB,
} from './actions';

const initialState = {
    allIngredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    current: 'bun',
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            }

        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                allIngredients: action.payload,
                ingredientsRequest: false,
            }

        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false,
            }

            case SET_CURRENT_TAB: {
                return {
                  ...state,
                  current: action.payload,
                };
              }

        default:
            return state;
    }
};