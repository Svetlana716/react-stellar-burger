import { createAsyncThunk } from '@reduxjs/toolkit';
import { postOrderData, getOrderData } from '../../utils/api';

export const postOrder = createAsyncThunk(
    'order/postOrder',
    async (ingredientsId) => {
        return await postOrderData(ingredientsId);
      }
);

export const getOrder = createAsyncThunk(
    'order/getOrder',
    async (number) => {
        return await getOrderData(number);
      }
);