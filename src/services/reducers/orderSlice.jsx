import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from '../../utils/Api';


export const createOrderNumber = createAsyncThunk(
  'order/createOrderNumber',
  async (id) => {
    const response = await createOrder(id);
    return response.order.number;
  }
)

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
  },
  extraReducers: builder => {
    builder
      .addCase(createOrderNumber.pending, (state) => {
        state.orderRequest = true;
        state.error = "";
      })
      .addCase(createOrderNumber.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.modalOrdervisable = true;
        state.orderNumber = action.payload
      })
      .addCase(createOrderNumber.rejected, (state, action) => {
        state.error = action.payload;
        state.orderRequest = false;
        state.orderNumber = 0;
        state.modalOrdervisable = false;
      });
  }
});

export default orderSlice.reducer;

export const { closeModalOrder } = orderSlice.actions;