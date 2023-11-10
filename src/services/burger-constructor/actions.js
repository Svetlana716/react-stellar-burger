import { v4 as uuidv4 } from 'uuid';

export const ADD_BUN = 'ADD_BUN';
export const ADD_OTHER_INGREDIENT = 'ADD_OTHER_INGREDIENT';
export const DELETE_OTHER_INGREDIENT = 'DELETE_OTHER_INGREDIENT';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';
export const CHANGE_THE_ORDER_OF_OTHER_INGREDIENTS = 'CHANGE_THE_ORDER_OF_OTHER_INGREDIENTS';

export const addBun = (ingredient) => ({
    type: ADD_BUN, 
    payload: ingredient,
});

export const addOtherIngredient = (ingredient) => ({
    type: ADD_OTHER_INGREDIENT, 
    payload: {
        ...ingredient,
        _id: uuidv4(),
    }
});

export const changeTheOrderOfIngredients = (dragIndex, hoverIndex) => ({
        type: CHANGE_THE_ORDER_OF_OTHER_INGREDIENTS,
        payload: {
            dragIndex: dragIndex,
            hoverIndex: hoverIndex,  
        }
});