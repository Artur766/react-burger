import currentIngredientSlice, { openIngredientModal, closeIngredientModal, visableIngredientDetails } from "./currentIngredientSlice"

test('should return the initial state', () => {
  const initialState = {
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
  }

  expect(currentIngredientSlice(undefined, { type: undefined })).toEqual(initialState)
});

test("should handle openIngredientModal", () => {
  const initialState = {
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
  }

  const nextState = currentIngredientSlice(initialState, openIngredientModal({}));

  expect(nextState.modalIngredientVisable).toEqual(true);
  expect(nextState.currentIngredient).toEqual({});
});

test("should handle closeIngredientModal", () => {
  const initialState = {
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
  }

  const nextState = currentIngredientSlice(initialState, closeIngredientModal());

  expect(nextState.modalIngredientVisable).toEqual(false);
  expect(nextState.currentIngredient).toEqual(initialState.currentIngredient);
});

test("should handle visableIngredientDetails", () => {
  const initialState = {
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
  }

  const nextState = currentIngredientSlice(initialState, visableIngredientDetails({}));

  expect(nextState.currentIngredient).toEqual({});
});