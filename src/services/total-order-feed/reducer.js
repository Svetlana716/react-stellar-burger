import { createReducer } from "@reduxjs/toolkit";

import {
    wsTotalOrderFeedOpen,
    wsTotalOrderFeedError,
    wsTotalOrderFeedClose,
    wsTotalOrderFeedMessage,
} from "./actions";

const initialState = {
    wsConnected: false,
    connectingError: null,

    totalOrders: null,
    total: null,
    totalToday: null,
};

export const totalOrderFeedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsTotalOrderFeedOpen, state => {
            state.wsConnected = true;
            state.connectingError = null;
        })
        .addCase(wsTotalOrderFeedError, (state, action) => {
            state.wsConnected = false;
            state.connectingError = action.error;
        })
        .addCase(wsTotalOrderFeedClose, state => {
            state.wsConnected = false;
            state.connectingError = null;
        })
        .addCase(wsTotalOrderFeedMessage, (state, action) => {
            state.connectingError = null;
            state.totalOrders = action.payload.orders;
            state.total =  action.payload.total;
            state.totalToday = action.payload.totalToday;
        })
});