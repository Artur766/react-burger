import { createAction } from "@reduxjs/toolkit";

export const connect = createAction<string, 'WS_CONNECTION_START'>('WS_CONNECTION_START');
export const disconnect = createAction('WS_CONNECTION_DISCONNECT');
export const wsConnecting = createAction('WS_CONNECTION_SUCCESS');
export const wsOpen = createAction('WS_CONNECTION_OPEN');
export const wsClose = createAction('WS_CONNECTION_CLOSE');
export const wsMessage = createAction('WS_SEND_MESSAGE');
export const wsError = createAction<string, 'WS_CONNECTION_ERROR'>('WS_CONNECTION_ERROR');

export type TWbActions = ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>
