import { createSlice } from '@reduxjs/toolkit';

const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState: {
    currentIngredient: {},
    modalIngredientVisable: false,
  },
  reducers: {
    openIngredientModal(state, action) {
      state.modalIngredientVisable = true;
      state.currentIngredient = action.payload;
    },
    closeIngredientModal(state) {
      state.modalIngredientVisable = false;
      state.currentIngredient = {};
    },
  }
});

export default currentIngredientSlice.reducer;

export const { openIngredientModal, closeIngredientModal } = currentIngredientSlice.actions;