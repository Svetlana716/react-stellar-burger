import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postOrderData, getOrderData } from '../../utils/api';
import { OrderType, FetchGetOrderSuccessType, FetchPostOrderSuccessType, FetchErrorType } from '../../utils/types';

export const getOrder = createAsyncThunk<FetchGetOrderSuccessType, number, { rejectValue: FetchErrorType }>(
    'order/getOrder',
    async (number) => {
        return await getOrderData(number);
      }
);

export const postOrder = createAsyncThunk<FetchPostOrderSuccessType, string[], { rejectValue: FetchErrorType }>(
    'order/postOrder',
    async (ingredientsId) => {
        return await postOrderData(ingredientsId);
      }
);

type OrderStateType = {
    name: string;
    order: {
        number: number | null;
    };
    orderData: OrderType[] | null;

    loading: boolean;
    error: string | null | undefined;
};

const initialState: OrderStateType = {
    name: '',
    order: {
        number: null,
    },
    orderData: null,

    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postOrder.fulfilled, (state, {payload}) => {
                state.name = payload.name;
                state.order.number = payload.order.number;
                state.loading = false;
            })
            .addCase(postOrder.rejected, (state, {error}) => {
                state.loading = false;
                if (error) state.error = error.message;
            })
            
            .addCase(getOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrder.fulfilled, (state, {payload}) => {
                state.orderData = payload.orders;
                state.loading = false;
            })
            .addCase(getOrder.rejected, (state, {error}) => {
                state.loading = false;
                if (error) state.error = error.message;
            })
    }
});

export const orderReducer = orderSlice.reducer;