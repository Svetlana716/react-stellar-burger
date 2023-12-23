import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients/reducer';
import { constructorReducer } from './burger-constructor/reducer';
import { orderReducer } from './order-details/reducer';
import { authReducer } from './auth/reducer';
import { wsTotalOrderFeedReducer } from './total-order-feed/reducer';
import { wsProfileOrderFeedReducer } from './profile-order-feed/reducer';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    orderDetails: orderReducer,
    authorization: authReducer,
    totalOrderFeed: wsTotalOrderFeedReducer,
    profileOrderFeed: wsProfileOrderFeedReducer,
});