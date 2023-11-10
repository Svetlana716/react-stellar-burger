import { SET_CURRENT_INGREDIENT, UNSET_CURRENT_INGREDIENT } from './actions';

const initialState = {
    currentIngredient: null,
};

export const ingredientsDetailsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.payload,
            };

        case UNSET_CURRENT_INGREDIENT:
            return initialState;

        default:
            return state;
    }
};