import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsData } from '../../utils/api';
import { IngredientType, FetchGetIngredientsSuccessType, FetchErrorType } from '../../utils/types';

export const getIngredients = createAsyncThunk<FetchGetIngredientsSuccessType, undefined, { rejectValue: FetchErrorType }>(
    'ingredients/getIngredients',
    async () => {
        return await getIngredientsData();
      }
);

type IngredientsStateType = {
    allIngredients: IngredientType[];
    currentTab: string;
    
    loading: boolean;
    error: string | null | undefined;
};

const initialState: IngredientsStateType = {
    allIngredients: [],
    currentTab: 'bun',
    
    loading: false,
    error: null,
};

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        setCurrentTab(state, {payload}: PayloadAction<string>) {
            state.currentTab = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getIngredients.fulfilled, (state, {payload}) => { //деструктуризация объекта action.payload
                state.allIngredients = payload.data;
                state.loading = false;
            })
            .addCase(getIngredients.rejected, (state, {error}) => {
                state.loading = false;
                if (error) state.error = error.message;
            })
    }
});

export const ingredientsReducer = ingredientsSlice.reducer;

export const { setCurrentTab } = ingredientsSlice.actions;