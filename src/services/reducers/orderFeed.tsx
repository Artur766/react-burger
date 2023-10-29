import { createSlice } from '@reduxjs/toolkit';

interface IOrderFeed {
  currentIngredient: {

  };
  modalVisable: boolean;
}

const initialState: IOrderFeed = {
  currentIngredient: {

  },
  modalVisable: false,
}

const orderFeedSlice = createSlice({
  name: "orderFeed",
  initialState,
  reducers: {
    openOrderFeedtModal(state) {
      state.modalVisable = true;
      // state.currentIngredient = action.payload;
    },
    closeOrderFeedModal(state) {
      state.modalVisable = false;
      state.currentIngredient = initialState.currentIngredient;
    },
    visableOrderFeedDetails(state, action) {
      state.currentIngredient = action.payload;
    }
  }
});

export default orderFeedSlice.reducer;

export const { openOrderFeedtModal, closeOrderFeedModal, visableOrderFeedDetails } = orderFeedSlice.actions;