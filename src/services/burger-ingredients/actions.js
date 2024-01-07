import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsData } from '../../utils/api';

export const getIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async () => {
        return await getIngredientsData();
      }
);