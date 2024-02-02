import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { IngredientType } from '../../utils/types';

type ConstructorStateType = {
    bun: IngredientType | null;
    otherIngredients: IngredientType[];
}

const initialState: ConstructorStateType = {
    bun: null,
    otherIngredients: [],
}

const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        addBun(state, {payload}: PayloadAction<IngredientType>) {
            state.bun = payload;
        },
        addOtherIngredient: {
            reducer: (state, {payload}: PayloadAction<IngredientType>) => {
                state.otherIngredients.push(payload);
            },
            prepare: (otherIngredients) => {
                return { payload: {...otherIngredients, uniqId: nanoid() }}
            }
        },
        deleteOtherIngredient(state, {payload}: PayloadAction<string>) {
            state.otherIngredients = state.otherIngredients.filter(ingredient => ingredient.uniqId !== payload)
        },
        changeTheOrderOfIngredients: {
            reducer: (state, {payload}: PayloadAction<{dragIndex: number, hoverIndex: number}>) => {
                const { dragIndex, hoverIndex } = payload;
                state.otherIngredients.splice(hoverIndex, 0, state.otherIngredients.splice(dragIndex, 1)[0]);
            },
            prepare: (dragIndex, hoverIndex) => {
                return { payload: { dragIndex: dragIndex, hoverIndex: hoverIndex }}
            }
        },
        resetConstructor(state) {
            state.bun = null;
            state.otherIngredients = [];
        }
    },
});

export const constructorReducer = constructorSlice.reducer;

export const { addBun, addOtherIngredient, deleteOtherIngredient, changeTheOrderOfIngredients, resetConstructor } = constructorSlice.actions;
