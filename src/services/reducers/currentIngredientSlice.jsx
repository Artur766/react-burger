import { createSlice } from '@reduxjs/toolkit';

const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState: {
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
  },
  reducers: {
    openIngredientModal(state, action) {
      state.idParams = null;
      state.modalIngredientVisable = true;
      state.currentIngredient = action.payload;
    },
    closeIngredientModal(state) {
      state.modalIngredientVisable = false;
      state.currentIngredient = {};
    },
    visableIngredientDetails(state, action) {
      state.currentIngredient = action.payload;
    }
  }
});

export default currentIngredientSlice.reducer;

export const { openIngredientModal, closeIngredientModal, visableIngredientDetails } = currentIngredientSlice.actions;