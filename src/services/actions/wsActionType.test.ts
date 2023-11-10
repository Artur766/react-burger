import * as actions from './wsActionTypes';

describe('Action creators', () => {
   it('should create an action with connect', () => {

      // Эталонный экшен
      const expectedAction = {
         type: 'WS_CONNECTION_START',
         payload: "url"
      }

      // Проверяем экшены на равенство
      expect(actions.connect("url")).toEqual(expectedAction)
   });

   it('should create an action with disconnect', () => {

      const expectedAction = {
         type: 'WS_CONNECTION_DISCONNECT',
      }

      expect(actions.disconnect()).toEqual(expectedAction)
   });

   it('should create an action with wsConnecting', () => {

      const expectedAction = {
         type: 'WS_CONNECTION_SUCCESS',
      }

      expect(actions.wsConnecting()).toEqual(expectedAction)
   });

   it('should create an action with wsOpen', () => {

      const expectedAction = {
         type: 'WS_CONNECTION_OPEN',
      }

      expect(actions.wsOpen()).toEqual(expectedAction)
   });

   it('should create an action with wsClose', () => {

      const expectedAction = {
         type: 'WS_CONNECTION_CLOSE',
      }

      expect(actions.wsClose()).toEqual(expectedAction)
   });

   it('should create an action with wsMessage', () => {

      const expectedAction = {
         type: 'WS_CONNECTION_MESSAGE',
         payload: 'data'
      }

      expect(actions.wsMessage('data')).toEqual(expectedAction)
   });

   it('should create an action with wsError', () => {

      const expectedAction = {
         type: 'WS_CONNECTION_ERROR',
         payload: 'data'
      }

      expect(actions.wsError('data')).toEqual(expectedAction)
   });

}) 