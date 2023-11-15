import { createSlice } from '@reduxjs/toolkit';
import { IIngredient } from '../../utils/types';

interface IIngredientsConstructor {
  ingredients: IIngredient[];
  bun: {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    productId: string;
    count: number;
  };
  totalPrice: number;
}

const initialState: IIngredientsConstructor = {
  ingredients: [],
  bun: {
    _id: "",
    name: "",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    productId: "",
    count: 0
  },
  totalPrice: 0,
}

const ingredientsConstructorSlice = createSlice({
  name: "ingredientsConstructor",
  initialState,
  reducers: {
    addIngredient(state, action) {
      state.ingredients.unshift(action.payload);
    },
    deleteIngredient(state, action) {
      console.log(state.ingredients);

      state.ingredients = state.ingredients.filter(item => item.id !== action.payload);
    },
    addBun(state, action) {
      state.bun = action.payload
    },
    deleteBun(state) {
      state.bun = initialState.bun;
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
    },
    resetConstructor(state) {
      state.ingredients = [];
      state.bun = initialState.bun;
    }
  }
});

export default ingredientsConstructorSlice.reducer;

export const {
  addIngredient,
  deleteIngredient,
  addBun, deleteBun,
  getTotalPrice,
  swapIngredient,
  resetConstructor,
} = ingredientsConstructorSlice.actions;