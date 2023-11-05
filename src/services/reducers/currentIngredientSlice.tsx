import { createSlice } from '@reduxjs/toolkit';

interface ICurrentIngredient {
  currentIngredient: {
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
  modalIngredientVisable: boolean;
}

const initialState: ICurrentIngredient = {
  currentIngredient: {
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
  modalIngredientVisable: false,
}

const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState,
  reducers: {
    openIngredientModal(state, action) {
      state.modalIngredientVisable = true;
      state.currentIngredient = action.payload;
    },
    closeIngredientModal(state) {
      state.modalIngredientVisable = false;
      state.currentIngredient = initialState.currentIngredient;
    },
    visableIngredientDetails(state, action) {
      state.currentIngredient = action.payload;
    }
  }
});

export default currentIngredientSlice.reducer;

export const { openIngredientModal, closeIngredientModal, visableIngredientDetails } = currentIngredientSlice.actions;