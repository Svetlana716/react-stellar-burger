import { createSlice } from '@reduxjs/toolkit';
import { postOrder, getOrder } from './actions';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        name: '',
        order: {
            number: null
        },
        orderData: null,
    
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.name = action.payload.name;
                state.order.number = action.payload.order.number;
                state.loading = false;
            })

            .addCase(getOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.orderData = action.payload.orders;
                state.loading = false;
            })

    }
});

export const orderReducer = orderSlice.reducer;