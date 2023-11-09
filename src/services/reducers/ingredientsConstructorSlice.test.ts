import ingredientsConstructorReducer, {
  addIngredient,
  deleteIngredient,
  addBun,
  deleteBun,
  getTotalPrice,
  swapIngredient,
  resetConstructor,
} from './ingredientsConstructorSlice';

describe('ingredientsConstructorSlice reducer', () => {
  const initialState = {
    ingredients: [],
    bun: {
      _id: '',
      name: '',
      type: '',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: '',
      image_mobile: '',
      image_large: '',
      productId: '',
      count: 0,
    },
    totalPrice: 0,
  };

  it('should handle addIngredient', () => {
    const ingredient = {
      id: '1',
      name: 'Ingredient 1',
      // остальные свойства ингредиента
    };

    const nextState = ingredientsConstructorReducer(initialState, addIngredient(ingredient));

    expect(nextState.ingredients).toHaveLength(1);
    expect(nextState.ingredients[0]).toEqual(ingredient);
  });

  it('should handle deleteIngredient', () => {

    const ingredient1 = {
      id: "1",
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
      __v: 0,
      count: 1,
      _id: ""
    };
    const ingredient2 = {
      id: "2",
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
      __v: 0,
      count: 1,
      _id: ""
    };

    const stateWithIngredients = {
      ...initialState,
      ingredients: [ingredient1, ingredient2],
    };

    const nextState = ingredientsConstructorReducer(stateWithIngredients, deleteIngredient('1'));

    expect(nextState.ingredients).toHaveLength(1);
    expect(nextState.ingredients[0]).toEqual(ingredient2);
  });

  it('should handle addBun', () => {
    const bun = {
      _id: '1',
      name: 'Bun 1',
      // остальные свойства булки
    };

    const nextState = ingredientsConstructorReducer(initialState, addBun(bun));

    expect(nextState.bun).toEqual(bun);
  });

  it('should handle deleteBun', () => {
    const stateWithBun = {
      ...initialState,
      bun: {
        _id: "1",
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
        __v: 0,
        count: 0
      },
    };

    const nextState = ingredientsConstructorReducer(stateWithBun, deleteBun());

    expect(nextState.bun).toEqual(initialState.bun);
  });

  it('should handle getTotalPrice', () => {
    const ingredient1 = {
      _id: "1",
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
      __v: 0,
      count: 0
    };
    const ingredient2 = {
      _id: "1",
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
      __v: 0,
      count: 0
    };
    const bun = {
      _id: "1",
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
      __v: 0,
      count: 0
    };
    const stateWithIngredientsAndBun = {
      ...initialState,
      ingredients: [ingredient1, ingredient2],
      bun: bun,
    };

    const nextState = ingredientsConstructorReducer(stateWithIngredientsAndBun, getTotalPrice());

    expect(nextState.totalPrice).toEqual(ingredient1.price + ingredient2.price + bun.price * 2);
  });

  it('should handle swapIngredient', () => {
    const ingredient1 = {
      _id: "1",
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
      __v: 0,
      count: 0
    };
    const ingredient2 = {
      _id: "1",
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
      __v: 0,
      count: 0
    };
    const stateWithIngredients = {
      ...initialState,
      ingredients: [ingredient1, ingredient2],
    };
    const payload = {
      currentIngredient: ingredient1,
      ingredient: ingredient2,
    };

    const nextState = ingredientsConstructorReducer(stateWithIngredients, swapIngredient(payload));

    expect(nextState.ingredients[0]).toEqual(ingredient2);
    expect(nextState.ingredients[1]).toEqual(ingredient1);
  });

  it('should handle resetConstructor', () => {
    const stateWithIngredientsAndBun = {
      ...initialState,
      ingredients: [
        {
          _id: "1",
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
          __v: 0,
          count: 0
        },
      ],
      bun: {
        _id: "1",
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
        __v: 0,
        count: 0
      },
    };

    const nextState = ingredientsConstructorReducer(stateWithIngredientsAndBun, resetConstructor());

    expect(nextState.ingredients).toHaveLength(0);
    expect(nextState.bun).toEqual(initialState.bun);
  });
});