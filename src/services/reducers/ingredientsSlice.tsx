import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllIngredients } from "../../utils/Api";
import { IIngredient } from '../../utils/types';

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients", async () => {
    const response = await getAllIngredients();

    return (response as { data: IIngredient[] }).data;
  }
)

interface ingredients {
  ingredients: IIngredient[],
  error: string,
  ingredientsRequest: boolean,
}

const initialState: ingredients = {
  ingredients: [],
  error: "",
  ingredientsRequest: false,
}

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    incrementCount(state, action) {
      const ingredient = state.ingredients.find(item => item._id === action.payload);

      if (ingredient && ingredient.type !== "bun") {
        ingredient.count++;
      } else if (ingredient) {
        ingredient.count += 2;
      }
    }
    ,
    decrementCount(state, action) {
      const ingredient = state.ingredients.find(item => item._id === action.payload);

      if (ingredient && ingredient.type !== "bun") {
        ingredient.count--;
      } else if (ingredient) {
        ingredient.count -= 2;
      }
    },
    resetCount(state) {
      state.ingredients = state.ingredients.map(item => ({ ...item, count: 0 }))
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.ingredientsRequest = true;
        state.error = "";
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsRequest = false;


        state.ingredients = action.payload.map(item => ({
          ...item,
          count: 0,
        }));
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.error = action.error.message || "Произошла ошибка";
        state.ingredientsRequest = false;
        state.ingredients = [];
      });
  }
})

export default ingredientsSlice.reducer;

export const {
  incrementCount,
  decrementCount,
  resetCount
} = ingredientsSlice.actions;
