import { createAction } from '@reduxjs/toolkit';
import { WSConnectSuccessType } from '../../utils/types';

export const profileOrderFeedConnect = createAction<string>('WS_PROFILE_ORDER_FEED_CONNECT');
export const profileOrderFeedDisconnect = createAction('WS_PROFILE_ORDER_FEED_DISCONNECT');

export const wsProfileOrderFeedOpen = createAction('WS_PROFILE_ORDER_FEED_CONNECTION_OPEN'); 
export const wsProfileOrderFeedError = createAction<string>('WS_PROFILE_ORDER_FEED_CONNECTION_ERROR');
export const wsProfileOrderFeedClose = createAction('WS_PROFILE_ORDER_FEED_CONNECTION_CLOSE');
export const wsProfileOrderFeedMessage = createAction<WSConnectSuccessType>('WS_PROFILE_ORDER_FEED_GET_MESSAGE');