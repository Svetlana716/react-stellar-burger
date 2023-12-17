import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients/reducer';
import { constructorReducer } from './burger-constructor/reducer';
import { orderReducer } from './order-details/reducer';
import { ingredientsDetailsReducer } from './ingredient-details/reducer';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    orderDetails: orderReducer,
    ingredientsDetails: ingredientsDetailsReducer,
});