import { ITokenResponse, IUser } from '../../utils/types';
import authSlice, { updateUserInfo, getUserInfo, resetSubmitMessageRequest, register, login, logout, forgotPassword } from './authSlice';

describe('authSlice', () => {
   it('should return the initial state', () => {
      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }

      expect(authSlice(undefined, { type: undefined })).toEqual(initialState);
   });

   it('should handle resetSubmitMessageRequest', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }

      const nextState = authSlice(initialState, resetSubmitMessageRequest());

      expect(nextState.error).toEqual("");
      expect(nextState.successUpdateUser).toEqual(false);
   });

   it('should handle register.pending', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }
      const requestId = "";
      const arg: IUser = {
         email: ""
      };

      const nextState = authSlice(initialState, register.pending(requestId, arg));

      expect(nextState.loading).toEqual(true);
      expect(nextState.error).toEqual("");
   });

   it('should handle register.fulfilled', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }

      const user = { name: "Артур", email: "adgamov@" }

      const arg: ITokenResponse = {
         success: false,
         accessToken: "",
         refreshToken: "",
         user: user
      };

      const nextState = authSlice(initialState, register.fulfilled(arg, "", user));

      expect(nextState.loading).toEqual(false);
      expect(nextState.isLoggedIn).toEqual(true);
      expect(nextState.user).toEqual(user);
   });

   it('should handle register.rejected', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }

      const user = { name: "Артур", email: "adgamov@" }


      const nextState = authSlice(initialState, register.rejected(null, 'Rejected', user));

      expect(nextState.loading).toEqual(false);
      expect(nextState.error).toEqual('Rejected');
   });

   it('should handle login.pending', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }

      const requestId = "";
      const arg: IUser = {
         email: ""
      };

      const nextState = authSlice(initialState, login.pending(requestId, arg));

      expect(nextState.loading).toEqual(true);
      expect(nextState.error).toEqual("");
   });

   it('should handle login.fulfilled', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }

      const user = { name: "Артур", email: "adgamov@" };

      const arg: ITokenResponse = {
         success: false,
         accessToken: "",
         refreshToken: "",
         user: user
      };

      const nextState = authSlice(initialState, login.fulfilled(arg, "", user));

      expect(nextState.loading).toEqual(false);
      expect(nextState.isLoggedIn).toEqual(true);
      expect(nextState.user).toEqual(user);
   });

   it('should handle register.rejected', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }
      const user = { name: "Артур", email: "adgamov@" }


      const nextState = authSlice(initialState, login.rejected(null, 'Rejected', user));

      expect(nextState.loading).toEqual(false);
      expect(nextState.error).toEqual('Rejected');
   });

   it('should handle forgotPassword.pending', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }

      const requestId = "";
      const arg: IUser = {
         email: ""
      };

      const nextState = authSlice(initialState, forgotPassword.pending(requestId, arg));

      expect(nextState.loading).toEqual(true);
      expect(nextState.error).toEqual("");
   });

   it('should handle forgotPassword.fulfilled', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }

      const user = { name: "Артур", email: "adgamov@" };

      const arg: ITokenResponse = {
         success: false,
         accessToken: "",
         refreshToken: "",
         user: user
      };

      const nextState = authSlice(initialState, forgotPassword.fulfilled(arg, "", user));

      expect(nextState.loading).toEqual(false);
      expect(nextState.resetDone).toEqual(true);
   });

   it('should handle forgotPassword.rejected', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }

      const user = { name: "Артур", email: "adgamov@" }


      const nextState = authSlice(initialState, forgotPassword.rejected(null, 'Rejected', user));

      expect(nextState.loading).toEqual(false);
      expect(nextState.error).toEqual('Rejected');
   });

   it('should handle logout.pending', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }

      const requestId = "";

      const nextState = authSlice(initialState, logout.pending(requestId));

      expect(nextState.loading).toEqual(true);
      expect(nextState.error).toEqual("");
   });

   it('should handle logout.fulfilled', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }
      const user = { name: "Артур", email: "adgamov@" };

      const nextState = authSlice(initialState, logout.fulfilled("", "",));

      expect(nextState.loading).toEqual(false);
      expect(nextState.isLoggedIn).toEqual(false);
   });

   it('should handle logout.rejected', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }

      const nextState = authSlice(initialState, logout.rejected(null, 'Rejected'));

      expect(nextState.loading).toEqual(false);
      expect(nextState.error).toEqual('Rejected');
   });

   it('should handle getUserInfo.pending', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }

      const nextState = authSlice(initialState, getUserInfo.pending(""));

      expect(nextState.loading).toEqual(true);
      expect(nextState.error).toEqual("");
   });

   it('should handle getUserInfo.fulfilled', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }

      const user = { name: "Артур", email: "adgamov@" }

      const nextState = authSlice(initialState, getUserInfo.fulfilled({ user }, ""));

      expect(nextState.loading).toEqual(false);
      expect(nextState.isLoggedIn).toEqual(true);
      expect(nextState.user).toEqual(user);
   });

   it('should handle getUserInfo.rejected', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }

      const nextState = authSlice(initialState, getUserInfo.rejected(null, "rejected"));

      expect(nextState.loading).toEqual(false);
   });

   it('should handle updateUserInfo.pending', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }
      const user = { name: "Артур", email: "adgamov@" }

      const nextState = authSlice(initialState, updateUserInfo.pending("", user));

      expect(nextState.loading).toEqual(true);
      expect(nextState.error).toEqual("");
   });

   it('should handle updateUserInfo.fulfilled', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }

      const user: IUser = { name: "Артур", email: "adgamov@" }

      const nextState = authSlice(initialState, updateUserInfo.fulfilled({ user }, "", user));

      expect(nextState.loading).toEqual(false);
      expect(nextState.successUpdateUser).toEqual(undefined);
      expect(nextState.user).toEqual(user);
      //удаление токена
   });

   it('should handle updateUserInfo.rejected', () => {

      const initialState = {
         user: {
            name: "",
            email: "",

         },
         loading: false,
         error: "",
         successUpdateUser: false,
         resetDone: false,
         isLoggedIn: false
      }
      const user = { name: "Артур", email: "adgamov@" }


      const nextState = authSlice(initialState, updateUserInfo.rejected(null, 'Rejected', user));

      expect(nextState.loading).toEqual(false);
      expect(nextState.error).toEqual('Rejected');

   });

});