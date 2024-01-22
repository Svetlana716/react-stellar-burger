import { createReducer } from "@reduxjs/toolkit";

import {
    wsProfileOrderFeedOpen,
    wsProfileOrderFeedError,
    wsProfileOrderFeedClose,
    wsProfileOrderFeedMessage,
} from "./actions";

const initialState = {
    wsConnected: false,
    connectingError: null,

    profileOrders: null,
};

export const profileOrderFeedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsProfileOrderFeedOpen, state => {
            state.wsConnected = true;
            state.connectingError = null;
        })
        .addCase(wsProfileOrderFeedError, (state, action) => {
            state.wsConnected = false;
            state.connectingError = action.error;
        })
        .addCase(wsProfileOrderFeedClose, state => {
            state.wsConnected = false;
            state.connectingError = null;
        })
        .addCase(wsProfileOrderFeedMessage, (state, action) => {
            state.connectingError = null;
            state.profileOrders = action.payload.orders;
        })
});