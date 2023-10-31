import { createReducer } from "@reduxjs/toolkit";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/wsActionTypes";
import { IMessage } from "../../utils/types";

type TWSState = {
  wsConnected: boolean;
  messages: IMessage | undefined;

  error?: string;
}

const initialState: TWSState = {
  wsConnected: false,
  messages: undefined,
  error: ''
}

export const wsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
      state.wsConnected = true;
    })
    .addCase(wsOpen, state => {
      state.wsConnected = true;
      state.error = "";
    })
    .addCase(wsClose, state => {
      state.error = "";
      state.wsConnected = false;
    })
    .addCase(wsError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.messages = action.payload;
    })
})