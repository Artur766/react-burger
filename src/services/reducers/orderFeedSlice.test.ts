import orderFeedSlice, { openOrderFeedtModal, closeOrderFeedModal, getDataOrder } from "./orderFeedSlice"

test('should return the initial stateOrder', () => {
  const initialState = {
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

  expect(orderFeedSlice(undefined, { type: undefined })).toEqual(initialState)
});

test("should handle openOrderFeedtModal", () => {
  const initialState = {
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

  const nextState = orderFeedSlice(initialState, openOrderFeedtModal({ item: {}, sum: 5 }));

  expect(nextState.modalVisable).toEqual(true);
  expect(nextState.currentOrder).toEqual({});
  expect(nextState.sumOrder).toEqual(5);

});

test("should handle closeOrderFeedModal", () => {
  const initialState = {
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

  const nextState = orderFeedSlice(initialState, closeOrderFeedModal());

  expect(nextState.modalVisable).toEqual(false);
  expect(nextState.currentOrder).toEqual(initialState.currentOrder);
});

test("should handle getDataOrder", () => {
  const initialState = {
    currentOrder: {
      price: 0,
      ingredients: [],
      _id: '',
      name: '',
      status: '',
      number: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    modalVisable: false,
    sumOrder: 0,
  }

  const nextState = orderFeedSlice(initialState, getDataOrder({ item: {}, sum: 5 }));

  expect(nextState.currentOrder).toEqual({});
  expect(nextState.sumOrder).toEqual(5);
});