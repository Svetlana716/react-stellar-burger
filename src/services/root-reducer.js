import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients/reducer';
import { constructorReducer } from './burger-constructor/reducer';
import { orderReducer } from './order-details/reducer';
import { authReducer } from './auth/reducer';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    orderDetails: orderReducer,
    authorization: authReducer,
});