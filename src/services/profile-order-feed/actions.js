import { createAction } from '@reduxjs/toolkit';

export const profileOrderFeedConnect = createAction('WS_PROFILE_ORDER_FEED_CONNECT');
export const profileOrderFeedDisconnect = createAction('WS_PROFILE_ORDER_FEED_DISCONNECT');

export const wsProfileOrderFeedOpen = createAction('WS_PROFILE_ORDER_FEED_CONNECTION_OPEN'); 
export const wsProfileOrderFeedError = createAction('WS_PROFILE_ORDER_FEED_CONNECTION_ERROR');
export const wsProfileOrderFeedClose = createAction('WS_PROFILE_ORDER_FEED_CONNECTION_CLOSE');
export const wsProfileOrderFeedMessage = createAction('WS_PROFILE_ORDER_FEED_GET_MESSAGE');