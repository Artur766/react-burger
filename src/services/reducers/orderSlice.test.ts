import orderSlice, { closeModalOrder, createOrderNumber } from "./orderSlice"

test('should return the initial state', () => {
  expect(orderSlice(undefined, { type: undefined })).toEqual({
    orderNumber: 0,
    modalOrdervisable: false,
    orderRequest: false,
    error: "",
  })
});

test("should handle closeModalOrder", () => {
  const initialState = {
    orderNumber: 0,
    modalOrdervisable: true,
    orderRequest: false,
    error: "",
  };

  const nextState = orderSlice(initialState, closeModalOrder());

  expect(nextState.modalOrdervisable).toEqual(false);
});

test("should handle createOrderNumber.pending", () => {
  const initialState = {
    orderNumber: 0,
    modalOrdervisable: true,
    orderRequest: false,
    error: "",
  };

  const requestId = ""; // Example requestId value
  const arg: string[] = []; // Example arg value

  const nextState = orderSlice(initialState, createOrderNumber.pending(requestId, arg));

  expect(nextState.orderRequest).toEqual(true);
  expect(nextState.error).toEqual("");
});

test("should handle createOrderNumber.fulfilled", () => {
  const initialState = {
    orderNumber: 0,
    modalOrdervisable: true,
    orderRequest: false,
    error: "",
  };

  const mockPayload = 12345;
  const requestId = "";
  const arg: string[] = [];

  const nextState = orderSlice(initialState, createOrderNumber.fulfilled(mockPayload, requestId, arg));

  expect(nextState.orderRequest).toEqual(false);
  expect(nextState.error).toEqual("");
  expect(nextState.orderNumber).toEqual(mockPayload);
});


test("should handle createOrderNumber.rejected", () => {
  const initialState = {
    orderRequest: true,
    error: "",
    orderNumber: 12345,
    modalOrdervisable: true,
  };

  const mockError = new Error("Something went wrong");

  const nextState = orderSlice(initialState, createOrderNumber.rejected(mockError, "", ["requestId", "requestStatus"]));

  expect(nextState.error).toEqual(mockError.message || "Произошла ошибка");
  expect(nextState.orderRequest).toEqual(false);
  expect(nextState.orderNumber).toEqual(0);
  expect(nextState.modalOrdervisable).toEqual(false);
});
