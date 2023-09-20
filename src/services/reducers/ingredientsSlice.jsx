import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllIngredients } from "../../utils/api";

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients", async () => {
    const response = await getAllIngredients();
    return response.data;
  }
)

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    error: "",
    ingredientsRequest: false,
  },
  reducers: {
    incrementCount(state, action) {
      const ingredient = state.ingredients.find(item => item._id === action.payload);
      if (ingredient.type !== "bun") {
        ingredient.count++;
      } else {
        ingredient.count += 2;
      }
    }
    ,
    decrementCount(state, action) {
      const ingredient = state.ingredients.find(item => item._id === action.payload);
      if (ingredient.type !== "bun" && ingredient) {
        ingredient.count--;
      } else {
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
        state.error = action.payload;
        state.ingredientsRequest = false;
        state.ingredients = [];
      });
  }
})

export default ingredientsSlice.reducer;

export const {
  getIngredientsRequest,
  getIngredientsFailed,
  getIngredientsSuccess,
  incrementCount,
  decrementCount,
  resetCount
} = ingredientsSlice.actions;
