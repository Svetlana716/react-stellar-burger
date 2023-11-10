import {
    ADD_BUN,
    ADD_OTHER_INGREDIENT,
    DELETE_OTHER_INGREDIENT,
    RESET_CONSTRUCTOR,
    CHANGE_THE_ORDER_OF_OTHER_INGREDIENTS,
} from './actions';

import update from 'immutability-helper';

const initialState = {
    bun: null,
    otherIngredients: [],
    totalPrice: 0,
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_BUN:
            return {
                ...state,
                bun: action.payload,
                totalPrice: action.payload.price * 2,
            };

        case ADD_OTHER_INGREDIENT:
            return {
                ...state,
                otherIngredients: [...state.otherIngredients, action.payload],
                totalPrice: state.totalPrice + action.payload.price,
            }

        case CHANGE_THE_ORDER_OF_OTHER_INGREDIENTS:
            return {
                ...state,
                otherIngredients: update(state.otherIngredients, {
                  $splice: [
                    [action.payload.dragIndex, 1],
                    [action.payload.hoverIndex, 0, state.otherIngredients[action.payload.dragIndex]],
                  ],
                }),
              };

        case DELETE_OTHER_INGREDIENT:
            return {
                ...state,
                otherIngredients: state.otherIngredients.filter(ingredient => ingredient._id !== action.payload._id),
                totalPrice: state.totalPrice - action.payload.price,
            }

        case RESET_CONSTRUCTOR:
            return initialState;

        default:
            return state;
    }
};