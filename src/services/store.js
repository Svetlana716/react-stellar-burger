import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './root-reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import {
  WS_TOTAL_ORDER_FEED_CONNECT,
  WS_TOTAL_ORDER_FEED_DISCONNECT,
  WS_TOTAL_ORDER_FEED_CONNECTION_SUCCESS,
  WS_TOTAL_ORDER_FEED_CONNECTION_CLOSED,
  WS_TOTAL_ORDER_FEED_CONNECTION_ERROR,
  WS_TOTAL_ORDER_FEED_GET_MESSAGE,
} from "./total-order-feed/actions";

import {
  WS_PROFILE_ORDER_FEED_CONNECT,
  WS_PROFILE_ORDER_FEED_DISCONNECT,
  WS_PROFILE_ORDER_FEED_CONNECTION_SUCCESS,
  WS_PROFILE_ORDER_FEED_CONNECTION_CLOSED,
  WS_PROFILE_ORDER_FEED_CONNECTION_ERROR,
  WS_PROFILE_ORDER_FEED_GET_MESSAGE,
} from "./profile-order-feed/actions";

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const totalOrderFeedMiddleware = socketMiddleware({
  wsConnect: WS_TOTAL_ORDER_FEED_CONNECT,
  wsDisconnect: WS_TOTAL_ORDER_FEED_DISCONNECT,
  onOpen: WS_TOTAL_ORDER_FEED_CONNECTION_SUCCESS,
  onClose: WS_TOTAL_ORDER_FEED_CONNECTION_CLOSED,
  onError: WS_TOTAL_ORDER_FEED_CONNECTION_ERROR,
  onMessage: WS_TOTAL_ORDER_FEED_GET_MESSAGE,
});

const profileOrderFeedMiddleware = socketMiddleware({
  wsConnect: WS_PROFILE_ORDER_FEED_CONNECT,
  wsDisconnect: WS_PROFILE_ORDER_FEED_DISCONNECT,
  onOpen: WS_PROFILE_ORDER_FEED_CONNECTION_SUCCESS,
  onClose: WS_PROFILE_ORDER_FEED_CONNECTION_CLOSED,
  onError: WS_PROFILE_ORDER_FEED_CONNECTION_ERROR,
  onMessage: WS_PROFILE_ORDER_FEED_GET_MESSAGE,
});

const enhancer = composeEnhancers(applyMiddleware(thunk, totalOrderFeedMiddleware, profileOrderFeedMiddleware));

export const store = createStore(rootReducer, enhancer);