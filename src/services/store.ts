import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './burger-ingredients/slice';
import { constructorReducer } from './burger-constructor/slice';
import { orderReducer } from './order-details/slice';
import { userReducer } from './user/slice';
import { totalOrderFeedReducer } from './total-order-feed/reducer';
import { profileOrderFeedReducer } from './profile-order-feed/reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import {
  totalOrderFeedConnect,
  totalOrderFeedDisconnect,
  wsTotalOrderFeedOpen,
  wsTotalOrderFeedClose,
  wsTotalOrderFeedError,
  wsTotalOrderFeedMessage,
} from "./total-order-feed/actions";

import {
  profileOrderFeedConnect,
  profileOrderFeedDisconnect,
  wsProfileOrderFeedOpen,
  wsProfileOrderFeedClose,
  wsProfileOrderFeedError,
  wsProfileOrderFeedMessage,
} from "./profile-order-feed/actions";

const totalOrderFeedMiddleware = socketMiddleware({
  wsConnect: totalOrderFeedConnect,
  wsDisconnect: totalOrderFeedDisconnect,
  onOpen: wsTotalOrderFeedOpen,
  onClose: wsTotalOrderFeedClose,
  onError: wsTotalOrderFeedError,
  onMessage: wsTotalOrderFeedMessage,
});

const profileOrderFeedMiddleware = socketMiddleware({
  wsConnect: profileOrderFeedConnect,
  wsDisconnect: profileOrderFeedDisconnect,
  onOpen: wsProfileOrderFeedOpen,
  onClose: wsProfileOrderFeedClose,
  onError: wsProfileOrderFeedError,
  onMessage: wsProfileOrderFeedMessage,
});

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    orderDetails: orderReducer,
    user: userReducer,
    totalOrderFeed: totalOrderFeedReducer,
    profileOrderFeed: profileOrderFeedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(totalOrderFeedMiddleware, profileOrderFeedMiddleware),
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;