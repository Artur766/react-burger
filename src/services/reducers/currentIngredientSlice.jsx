import { createSlice } from '@reduxjs/toolkit';

const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState: {
    currentIngredient: {},
    modalIngredientVisable: false,
    idParams: null,
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
      const { idParams, dataIngredient } = action.payload;
      state.idParams = idParams;
      state.currentIngredient = dataIngredient
    }
  }
});

export default currentIngredientSlice.reducer;

export const { openIngredientModal, closeIngredientModal, visableIngredientDetails } = currentIngredientSlice.actions;