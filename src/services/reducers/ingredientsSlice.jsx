import { createSlice } from '@reduxjs/toolkit';
import { getAllIngredients } from "../../utils/Api";

export function getIngredients() {
  return function (dispatch) {
    dispatch(getIngredientsRequest());
    getAllIngredients()
      .then(res => dispatch(getIngredientsSuccess(res.data)))
      .catch(err => dispatch(getIngredientsFailed(err.message)))
  }
}

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    error: "",
    ingredientsRequest: false,
  },
  reducers: {
    getIngredientsRequest(state) {
      state.ingredientsRequest = true;
      state.error = "";
    },
    getIngredientsSuccess(state, action) {
      state.ingredientsRequest = false;
      state.ingredients = action.payload;
    },
    getIngredientsFailed(state, action) {
      state.error = action.payload;
      state.ingredientsRequest = false;
    }
  },
})

export default ingredientsSlice.reducer;

export const { getIngredientsRequest, getIngredientsFailed, getIngredientsSuccess } = ingredientsSlice.actions;
