import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
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

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;