import { BASE_URL } from "./constants";
import Cookies from 'js-cookie';
import { request } from "./Api";
import { ITokenResponse, IUser } from "./types";

function saveToken<T extends string>(token: T, tokenResponse: T) {
  Cookies.set('token', token, { expires: 1 });
  Cookies.set('refreshToken', tokenResponse, { expires: 7 });
}
function handleToken(res: unknown): ITokenResponse | undefined {

  const tokenResponse = res as ITokenResponse;

  if (tokenResponse.accessToken && tokenResponse.refreshToken) {
    saveToken(tokenResponse.accessToken.split('Bearer ')[1], tokenResponse.refreshToken);
    return tokenResponse;
  }
}

export function registerApi({ email, password, name }: IUser) {
  return request(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": 'application/json'
    },
    body: JSON.stringify({ "email": email, "password": password, "name": name })
  })
    .then(handleToken)
}

export function loginApi({ email, password }: IUser) {
  return request(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": 'application/json'
    },
    body: JSON.stringify({ "email": email, "password": password })
  })
    .then(handleToken)
}

export function refreshToken() {
  if (Cookies.get("token")) {
    return Promise.resolve("Bearer " + Cookies.get("token"));
  }
  return request(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ "token": Cookies.get("refreshToken") })
  })
    .then(res => (res as ITokenResponse).accessToken);
}

export function logoutApi(refreshToken: string) {
  return request(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ "token": refreshToken })
  })
}

export function getUserInfoApi() {
  return refreshToken()
    .then(token => {
      return request(`${BASE_URL}/auth/user`, {
        headers: {
          "Content-type": "application/json",
          "authorization": token
        },
      })
    });
}

export function updateUserInfoApi({ name, email, password }: IUser) {
  return refreshToken()
    .then(token => {
      return request(`${BASE_URL}/auth/user`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "authorization": token
        },
        body: JSON.stringify({ "name": name, "email": email, "password": password })
      })
    });
}
