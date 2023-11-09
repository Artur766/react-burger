import ingredientsSlice, { getIngredients, incrementCount, decrementCount, resetCount } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  it('should return the initial state', () => {
    const initialState = {
      ingredients: [],
      error: '',
      ingredientsRequest: false,
    };

    expect(ingredientsSlice(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle incrementCount', () => {
    const initialState = {

      ingredients: [
        {
          _id: '1',
          count: 0,
          type: 'ingredient',
          name: "",
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: "",
          image_mobile: "",
          image_large: "",
          productId: "",
          __v: 1,
          id: "",
        },
        {
          _id: '2',
          count: 0,
          type: 'bun',
          name: "",
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: "",
          image_mobile: "",
          image_large: "",
          productId: "",
          __v: 1,
          id: "",
        },
      ],

      error: '',
      ingredientsRequest: false,
    };

    const nextState = ingredientsSlice(initialState, incrementCount('1'));

    expect(nextState.ingredients[0].count).toEqual(1);
  });

  it('should handle decrementCount', () => {
    const initialState = {
      ingredients: [
        {
          _id: '1',
          count: 2,
          type: 'ingredient',
          name: "",
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: "",
          image_mobile: "",
          image_large: "",
          productId: "",
          __v: 1,
          id: "",
        },
        {
          _id: '1',
          count: 2,
          type: 'bun',
          name: "",
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: "",
          image_mobile: "",
          image_large: "",
          productId: "",
          __v: 1,
          id: "",
        },
      ],
      error: '',
      ingredientsRequest: false,
    };

    const nextState = ingredientsSlice(initialState, decrementCount('1'));

    expect(nextState.ingredients[0].count).toEqual(1);
  });

  it('should handle resetCount', () => {
    const initialState = {
      ingredients: [
        {
          _id: '1',
          count: 2,
          type: 'ingredient',
          name: "",
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: "",
          image_mobile: "",
          image_large: "",
          productId: "",
          __v: 1,
          id: "",
        },
        {
          _id: '1',
          count: 2,
          type: 'bun',
          name: "",
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: "",
          image_mobile: "",
          image_large: "",
          productId: "",
          __v: 1,
          id: "",
        },
      ],
      error: '',
      ingredientsRequest: false,
    };

    const nextState = ingredientsSlice(initialState, resetCount());

    expect(nextState.ingredients[0].count).toEqual(0);
    expect(nextState.ingredients[1].count).toEqual(0);
  });

  it('should handle getIngredients.pending', () => {
    const initialState = {
      ingredients: [],
      error: '',
      ingredientsRequest: false,
    };

    const nextState = ingredientsSlice(initialState, getIngredients.pending(""));

    expect(nextState.ingredientsRequest).toEqual(true);
    expect(nextState.error).toEqual('');
  });

  it('should handle getIngredients.fulfilled', () => {
    const initialState = {
      ingredients: [
        {
          _id: '3',
          count: 2,
          type: 'ingredient',
          name: "",
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: "",
          image_mobile: "",
          image_large: "",
          productId: "",
          __v: 1,
          id: "",
        },
      ],
      error: '',
      ingredientsRequest: false,
    };

    const ingredients = [
      {
        _id: '1',
        count: 0,
        type: 'ingredient',
        name: "",
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: "",
        image_mobile: "",
        image_large: "",
        productId: "",
        __v: 1,
        id: "",
      },
      {
        _id: '2',
        count: 0,
        type: 'bun',
        name: "",
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: "",
        image_mobile: "",
        image_large: "",
        productId: "",
        __v: 1,
        id: "",
      },
    ]

    const nextState = ingredientsSlice(initialState, getIngredients.fulfilled(ingredients, ""));

    expect(nextState.ingredientsRequest).toEqual(false);
    expect(nextState.ingredients).toEqual(ingredients);
  });

  it('should handle getIngredients.rejected', () => {
    const initialState = {
      ingredients: [],
      error: '',
      ingredientsRequest: true,
    };

    const nextState = ingredientsSlice(initialState, getIngredients.rejected(null, 'Rejected'));

    expect(nextState.ingredientsRequest).toEqual(false);
    expect(nextState.error).toEqual('Rejected');
    expect(nextState.ingredients).toEqual([]);
  });
});