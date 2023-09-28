import { createSlice } from '@reduxjs/toolkit';

const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState: {
    currentIngredient: {},
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