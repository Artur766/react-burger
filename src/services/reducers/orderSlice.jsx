import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from '../../utils/Api';

export function createOrderNumber(id) {
  return function (dispatch) {
    dispatch(postOrderRequest());
    createOrder(id)
      .then(res => dispatch(postOrderSuccess(res.order.number)))
      .catch(err => dispatch(postOrderFailed(err.message)))
  }
}

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderNumber: 0,
    modalOrdervisable: false,
    orderRequest: false,
    error: "",
  },
  reducers: {
    closeModalOrder(state) {
      state.modalOrdervisable = false;
    },
    postOrderRequest(state) {
      state.orderRequest = true;
      state.error = "";
    },
    postOrderSuccess(state, action) {
      state.orderRequest = false;
      state.modalOrdervisable = true;
      state.orderNumber = action.payload;
    },
    postOrderFailed(state, action) {
      state.error = action.payload;
      state.orderRequest = false;
    }
  }
});

export default orderSlice.reducer;

export const { postOrderRequest, postOrderSuccess, postOrderFailed, closeModalOrder } = orderSlice.actions;