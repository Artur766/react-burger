import { combineReducers } from "redux";
import ingredientsSlice from "./reducers/ingredientsSlice";
import ingredientsConstructorSlice from "./reducers/ingredientsConstructorSlice";
import currentIngredientSlice from "./reducers/currentIngredientSlice";
import orderSlice from "./reducers/orderSlice";
import authSlice from "./reducers/authSlice";

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  ingredientsConstructor: ingredientsConstructorSlice,
  currentIngredient: currentIngredientSlice,
  order: orderSlice,
  auth: authSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
