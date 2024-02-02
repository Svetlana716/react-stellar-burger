import { createReducer } from "@reduxjs/toolkit";
import { OrderType } from '../../utils/types';
import {
    wsProfileOrderFeedOpen,
    wsProfileOrderFeedError,
    wsProfileOrderFeedClose,
    wsProfileOrderFeedMessage,
} from "./actions";

type ProfileFeedStateType = {
    wsConnected: boolean;
    connectingError: string | null;

    profileOrders: OrderType[] | null;
}

const initialState: ProfileFeedStateType = {
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
        .addCase(wsProfileOrderFeedMessage, (state, {payload}) => {
            state.connectingError = null;
            state.profileOrders = payload.orders;
        })
        .addCase(wsProfileOrderFeedError, (state, {payload}) => {
            state.wsConnected = false;
            state.connectingError = payload;
        })
        .addCase(wsProfileOrderFeedClose, state => {
            state.wsConnected = false;
            state.connectingError = null;
        })
});