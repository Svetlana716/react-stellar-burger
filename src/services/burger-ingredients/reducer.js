import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './actions';

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        allIngredients: [],
        currentTab: 'bun',
        
        loading: false,
        error: null,
    },
    reducers: {
        setCurrentTab(state, action) {
            state.currentTab = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getIngredients.fulfilled, (state, action) => {
                state.allIngredients = action.payload.data;
                state.loading = false;
            })
    }
});

export const ingredientsReducer = ingredientsSlice.reducer;

export const { setCurrentTab } = ingredientsSlice.actions;