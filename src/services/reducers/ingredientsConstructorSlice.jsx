import { createSlice } from '@reduxjs/toolkit';

const ingredientsConstructorSlice = createSlice({
  name: "ingredientsConstructor",
  initialState: {
    ingredients: [],
    bun: { price: 0 },
    totalPrice: 0,
  },
  reducers: {
    addIngredient(state, action) {
      state.ingredients.unshift(action.payload);
    },
    deleteIngredient(state, action) {
      state.ingredients = state.ingredients.filter(item => item.id !== action.payload);
    },
    addBun(state, action) {
      state.bun = action.payload
    },
    deleteBun(state) {
      state.bun = { price: 0 };
    },
    getTotalPrice(state) {
      state.totalPrice = state.ingredients.reduce((acc, item) => item.price + acc, 0) + state.bun.price * 2;
    }
  }
});

export default ingredientsConstructorSlice.reducer;

export const { addIngredient, deleteIngredient, addBun, deleteBun, getTotalPrice } = ingredientsConstructorSlice.actions;