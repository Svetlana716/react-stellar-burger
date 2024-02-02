import { createReducer } from "@reduxjs/toolkit";
import { OrderType } from '../../utils/types';
import {
    wsTotalOrderFeedOpen,
    wsTotalOrderFeedError,
    wsTotalOrderFeedClose,
    wsTotalOrderFeedMessage,
} from "./actions";

type TotalFeedStateType = {
    wsConnected: boolean;
    connectingError: string | null;

    totalOrders: OrderType[] | null;
    total: number | null;
    totalToday: number | null;
}

const initialState: TotalFeedStateType = {
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
        .addCase(wsTotalOrderFeedMessage, (state, {payload}) => {
            state.connectingError = null;
            state.totalOrders = payload.orders;
            state.total =  payload.total;
            state.totalToday = payload.totalToday;
        })
        .addCase(wsTotalOrderFeedError, (state, {payload}) => {
            state.wsConnected = false;
            state.connectingError = payload;
        })
        .addCase(wsTotalOrderFeedClose, state => {
            state.wsConnected = false;
            state.connectingError = null;
        })
});