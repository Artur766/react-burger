import { wsConnecting, wsOpen, wsClose, wsError, wsMessage } from "../actions/wsActionTypes";
import { wsReducer } from "./wsReducer";

describe('wsReducer', () => {
  it('should handle wsConnecting', () => {
    const initialState = {
      wsConnected: false,
      messages: undefined,
      messagesProfile: undefined,
      error: ''
    };

    const nextState = wsReducer(initialState, wsConnecting());

    expect(nextState.wsConnected).toBe(true);
    expect(nextState.error).toBe('');
  });

  it('should handle wsOpen', () => {
    const initialState = {
      wsConnected: false,
      messages: undefined,
      messagesProfile: undefined,
      error: ''
    };

    const nextState = wsReducer(initialState, wsOpen());

    expect(nextState.wsConnected).toBe(true);
    expect(nextState.error).toBe('');
  });

  it('should handle wsClose', () => {
    const initialState = {
      wsConnected: true,
      messages: undefined,
      messagesProfile: undefined,
      error: ''
    };

    const nextState = wsReducer(initialState, wsClose());

    expect(nextState.wsConnected).toBe(false);
    expect(nextState.error).toBe('');
  });

  it('should handle wsError', () => {
    const initialState = {
      wsConnected: true,
      messages: undefined,
      messagesProfile: undefined,
      error: ''
    };

    const errorMessage = 'Connection error';

    const nextState = wsReducer(initialState, wsError(errorMessage));

    expect(nextState.wsConnected).toBe(true);
    expect(nextState.error).toBe(errorMessage);
  });

  it('should handle wsMessage', () => {
    const initialState = {
      wsConnected: true,
      messages: undefined,
      messagesProfile: undefined,
      error: ''
    };

    const message = { text: 'Hello' };

    const nextState = wsReducer(initialState, wsMessage(message));

    expect(nextState.wsConnected).toBe(true);
    expect(nextState.messages).toBe(message);
  });
});