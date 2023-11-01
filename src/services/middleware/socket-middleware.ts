import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { Middleware } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

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

export const socketMiddleware = (wsActions: TwsActionTypes): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return next => action => {

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
        const token = Cookies.get("token");
        const url = `${action.payload}?token=${token}`;
        socket = new WebSocket(url);
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

        if (wsSendMessage && wsSendMessage.match(action)) {
          socket.send(JSON.stringify(action.payload))
        }

        if (wsDisconnect.match(action)) {
          socket.close();
          socket = null;
        }
      }
      return next(action);
    };
  };
};