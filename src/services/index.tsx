import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from "./reducers/ingredientsSlice";
import ingredientsConstructorSlice from "./reducers/ingredientsConstructorSlice";
import currentIngredientSlice from "./reducers/currentIngredientSlice";
import orderSlice from "./reducers/orderSlice";
import authSlice from "./reducers/authSlice";

import {
  connect,
  disconnect,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen
} from "./actions/wsActionTypes"
import { wsReducer } from "./reducers/wsReducer";
import { socketMiddleware } from "./middleware/socket-middleware";
import orderFeedSlice from "./reducers/orderFeedSlice";

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  ingredientsConstructor: ingredientsConstructorSlice,
  currentIngredient: currentIngredientSlice,
  order: orderSlice,
  auth: authSlice,
  feed: orderFeedSlice,
  orderFeed: wsReducer,
});

const feedOrdersMiddleware = socketMiddleware({
  wsConnect: connect,
  wsDisconnect: disconnect,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedOrdersMiddleware)
  },

})
export type RootState = ReturnType<typeof rootReducer>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;