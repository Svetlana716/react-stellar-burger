import { RootState } from "../store";

export const getIngredientsPath = (store: RootState) => store.ingredients;
export const getIngredientsOnly = (store: RootState) => store.ingredients.allIngredients;