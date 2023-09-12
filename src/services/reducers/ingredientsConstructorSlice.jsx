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
    },
    swapIngredient(state, action) {
      const { currentIngredient, ingredient } = action.payload;
      const currentIngredientIndex = state.ingredients.findIndex(item => item.id === currentIngredient.id);
      const containerIngredientIndex = state.ingredients.findIndex(item => item.id === ingredient.id);

      if (currentIngredientIndex !== -1 && containerIngredientIndex !== -1) {
        // Обменять местами ингредиенты в массиве
        [state.ingredients[currentIngredientIndex], state.ingredients[containerIngredientIndex]] =
          [state.ingredients[containerIngredientIndex], state.ingredients[currentIngredientIndex]];
      }
    }
  }
});

export default ingredientsConstructorSlice.reducer;

export const { addIngredient, deleteIngredient, addBun, deleteBun, getTotalPrice, swapIngredient } = ingredientsConstructorSlice.actions;