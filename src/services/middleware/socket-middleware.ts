import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "..";

export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>,
  wsDisconnect: ActionCreatorWithoutPayload,
  wsSendMessage?: ActionCreatorWithPayload<any>,
  wsConnecting: ActionCreatorWithoutPayload,
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onError: ActionCreatorWithPayload<string>,
  onMessage: ActionCreatorWithPayload<any>,
}

export const socketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
  return (store => {
    let socket: WebSocket | null = null;

    return next => (action) => {
      const { dispatch } = store;
      const {
        wsConnect,
        wsDisconnect,
        wsConnecting,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsSendMessage } = wsActions;

      if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload);
        dispatch(wsConnecting())
      }

      if (socket) {
        socket.onopen = event => {
          dispatch(onOpen());
        };

        socket.onerror = event => {
          dispatch(onError("Error"));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = event => {
          dispatch(onClose());
        };

        if (wsSendMessage?.match(action) === wsSendMessage) {
          socket.send(JSON.stringify(action.payload))
        }

        if (wsDisconnect.match(action)) {
          socket.close();
          socket = null;
        }
      }
      next(action);
    };
  });
};