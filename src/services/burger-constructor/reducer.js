import { createSlice, nanoid } from '@reduxjs/toolkit';

const constructorSlice = createSlice({
    name: 'constructor',
    initialState: {
        bun: null,
        otherIngredients: [],
    },
    reducers: {
        addBun(state, action) {
            state.bun = action.payload;
        },
        addOtherIngredient: {
            reducer: (state, action) => {
                state.otherIngredients.push(action.payload);
            },
            prepare: (otherIngredients) => {
                return { payload: {...otherIngredients, uniqId: nanoid() }}
            }
        },
        deleteOtherIngredient(state, action) {
            state.otherIngredients = state.otherIngredients.filter(ingredient => ingredient.uniqId !== action.payload.uniqId)
        },
        changeTheOrderOfIngredients: {
            reducer: (state, action) => {
                const { dragIndex, hoverIndex } = action.payload;
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
