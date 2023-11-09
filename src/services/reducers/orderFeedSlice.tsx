import { createSlice } from '@reduxjs/toolkit';

export interface IOrderFeed {
  currentOrder: {
    ingredients: string[],
    _id: string,
    name: string,
    status: string,
    number: number,
    createdAt: string,
    updatedAt: string,
    price: number,
  };
  sumOrder: number;
  modalVisable: boolean;
}

const initialState: IOrderFeed = {
  currentOrder: {
    price: 0,
    ingredients: [],
    _id: '',
    name: '',
    status: '',
    number: 0,
    createdAt: "2023-11-09T15:46:56.335Z",
    updatedAt: "2023-11-09T15:46:56.335Z",
  },
  modalVisable: false,
  sumOrder: 0,
}

const orderFeedSlice = createSlice({
  name: "orderFeedSlice",
  initialState,
  reducers: {
    openOrderFeedtModal(state, action) {
      const { item, sum } = action.payload;
      state.modalVisable = true;
      state.currentOrder = item;
      state.sumOrder = sum;
    },
    closeOrderFeedModal(state) {
      state.modalVisable = false;
      state.currentOrder = initialState.currentOrder;
    },
    getDataOrder(state, action) {
      const { item, sum } = action.payload;
      state.currentOrder = item;
      state.sumOrder = sum;
    }
  },
});

export default orderFeedSlice.reducer;

export const { openOrderFeedtModal, closeOrderFeedModal, getDataOrder } = orderFeedSlice.actions;