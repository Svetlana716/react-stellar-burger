import { createAction } from '@reduxjs/toolkit';
import { WSConnectSuccessType } from '../../utils/types';

export const totalOrderFeedConnect = createAction<string>('WS_TOTAL_ORDER_FEED_CONNECT');
export const totalOrderFeedDisconnect = createAction('WS_TOTAL_ORDER_FEED_DISCONNECT');

export const wsTotalOrderFeedOpen = createAction('WS_TOTAL_ORDER_FEED_CONNECTION_OPEN');
export const wsTotalOrderFeedError = createAction<string>('WS_TOTAL_ORDER_FEED_CONNECTION_ERROR');
export const wsTotalOrderFeedClose = createAction('WS_TOTAL_ORDER_FEED_CONNECTION_CLOSE');
export const wsTotalOrderFeedMessage = createAction<WSConnectSuccessType>('WS_TOTAL_ORDER_FEED_GET_MESSAGE');